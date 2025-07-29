import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorysController } from './historys.controller.js';
import { HistorysService } from './historys.service.js';
import { History, HistorySchema } from './schemas/history.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [HistorysController],
  providers: [HistorysService]
})
export class HistorysModule { }
