import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { Chat, ChatDocument } from 'src/chats/schemas/chat.schema';
import { Types } from 'mongoose';

@Injectable()
export class MessagesService {

  constructor(
    @InjectModel(Message.name) private messageModel: SoftDeleteModel<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: SoftDeleteModel<ChatDocument>,
  ) { }

  async create(createMessageDto: CreateMessageDto, user: IUser) {

    const payload: any = {
      text: createMessageDto?.text,
      image: createMessageDto?.image,
      chat: createMessageDto.chat,
      sender: user._id,
      readBy: createMessageDto?.readBy
    }

    const newMessage = await this.messageModel.create(payload)
    newMessage.save();

    await this.chatModel.updateOne(
      { _id: newMessage.chat._id },
      {
        $addToSet: {
          unreadCounts: {
            userID: new Types.ObjectId(user._id),
            messageID: new Types.ObjectId(newMessage._id),
          },
        },
        $set: {
          lastMessage: new Types.ObjectId(newMessage._id),
        },
      }
    );


    return true;

  }

  findAll() {
    return `This action returns all messages`;
  }

  async findOne(chatID: string, user: IUser) {


    const messages = await this.messageModel.find({ chat: chatID })
      .populate("sender", "_id name avatar email createdAt updatedAt")
      .sort({ createdAt: 1 });

    if (messages.length === 0) {
      throw new BadRequestException("Không tìm thấy tin nhắn nào trong đoạn chat này");
    }

    // const chatUsers = await messages[0].populate("chat", "users");

    // //@ts-ignore
    // const userIdsInChat = chatUsers.chat.users.map((u: any) => u._id.toString());

    // // // Kiểm tra nếu user hiện tại không thuộc đoạn chat
    // if (!userIdsInChat.includes(user._id.toString())) {
    //   throw new BadRequestException("Bạn không có quyền truy cập vào đoạn chat này");
    // }

    return messages;
  }


  async findAllMessages(chatID: string, user: IUser) {
    await this.messageModel.updateMany(
      {
        chat: chatID,
        sender: { $ne: user._id },
        readBy: {
          $nin: [user._id],
        },
      },
      { $addToSet: { readBy: user._id } }
    );

    const existingChat = await this.chatModel.findById(chatID);
    const existingUnreadCounts = existingChat?.unreadCounts;
    const newUnreadCounts = { ...existingUnreadCounts, [user._id]: 0 };
    await this.chatModel.findByIdAndUpdate(chatID, {
      unreadCounts: newUnreadCounts,
    });

    return { message: "Messages marked as read" };
  }


  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
