import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service.js';
import { ResponseMessage, User } from '../decorators/customiz.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { IUser } from '../users/users.interface.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';


@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @ResponseMessage('create company')
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  findAll(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query() qs: string) {
    return this.companiesService.findAll(+page, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
