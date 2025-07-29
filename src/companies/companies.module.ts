import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { CompaniesController } from './companies.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule { }
