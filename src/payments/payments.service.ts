import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { IUser } from '../users/users.interface.js';
import { Payment, PaymentDocument } from './schemas/payment.schema.js';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: SoftDeleteModel<PaymentDocument>,

  ) { }

  async create(createPaymentDto: CreatePaymentDto, user: IUser) {
    return await this.paymentModel.create({...createPaymentDto})
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
