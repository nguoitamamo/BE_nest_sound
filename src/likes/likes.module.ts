import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Like, LikeSchema } from './schemas/like.schema.js';
import { LikesController } from './likes.controller.js';
import { LikesService } from './likes.service.js';


@Module({
  imports: [MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule { }
