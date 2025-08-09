import { Module } from '@nestjs/common';
import { CallsController } from './calls.controller.js';
import { CallsService } from './calls.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from './shemas/call.schema.js';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Call.name, schema: CallSchema },
 
  ])],
  controllers: [CallsController],
  providers: [CallsService]
})
export class CallsModule { }
