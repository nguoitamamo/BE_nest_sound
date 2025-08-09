import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Types } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';

@Injectable()
export class ChatsService {

  constructor(
    @InjectModel(Chat.name) private chatModel: SoftDeleteModel<ChatDocument>,
  ) { }

  async create(createChatDto: CreateChatDto, user: IUser) {
    const { users, isGroupChat } = createChatDto;


    const existingChat = await this.chatModel.findOne({
      isGroupChat: false,
      users: { $all: users }
    })
    if (existingChat) {
      return true;
    }


    const chat = await this.chatModel.create({
      users,
      createdBy: user._id,
      isGroupChat
    });

    const populatedChat = await this.chatModel.findById(chat._id)
      .populate("users", "_id name avatar email createdAt updatedAt")
      .populate("lastMessage")
      .populate("createdBy", "_id name avatar email createdAt updatedAt")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "_id name avatar email createdAt updatedAt"
        },
      })
      .sort({ updatedAt: -1 });

    return populatedChat;
  }

  async UpdateUnreadCount(userID: string, messageID: string, chatID: string) {
    const tmp = await this.chatModel.updateOne(
      { _id: chatID },
      {
        $addToSet: {
          unreadCounts: {
            userID: new Types.ObjectId(userID),
            messageID: new Types.ObjectId(messageID),
          },
        },
      }
    );
    console.log(">> check read count", tmp);
    return true;
  }


  async UpdateUserAllReadAndLastMessage(chatId: string, readByUserId: string) {
    await this.chatModel.updateOne(
      { _id: chatId },
      {
        $pull: {
          unreadCounts: {
            userID: new Types.ObjectId(readByUserId),
          },
        }
      }
    )
  }


  findAll() {
    return `This action returns all chats`;
  }

  async findOne(user: IUser) {
    return await this.chatModel.find({
      users: {
        $in: [user._id],
      },
    })
      .populate("users", "_id name avatar email createdAt updatedAt")
      .populate("lastMessage")
      .populate("createdBy", "_id name avatar email createdAt updatedAt")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "_id name avatar email createdAt updatedAt"
        },
      })
      .sort({ lastMessageAt: -1 });
  }

  async findOneChatWithUser(chatID: string, userID: string, user: IUser) {

    if (userID !== user._id)
      throw new BadRequestException('Bạn không có quyền truy cập chat của người khác')

    const chat = await this.chatModel.findById(chatID)
      .populate("users")
      .populate("lastMessage")
      .populate("createdBy")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
        },
      });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }


  async handleUpdateUserChat(userID: string, chatID: string) {
    const updatedChat = await this.chatModel.findByIdAndUpdate(
      chatID,
      { $addToSet: { users: userID } },
      { new: true, select: 'users' } // trả về document sau update
    );

    if (!updatedChat) {
      throw new Error("Chat not found");
    }

    return updatedChat.users;
  }


}
