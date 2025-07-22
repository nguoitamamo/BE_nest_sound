import { Module } from '@nestjs/common';
import { HistorysService } from './historys.service';
import { HistorysController } from './historys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './schemas/history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [HistorysController],
  providers: [HistorysService]
})
export class HistorysModule { }
