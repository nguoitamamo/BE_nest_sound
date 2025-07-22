import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {

  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  create(createCompanyDto: CreateCompanyDto, user: IUser) {


    return this.companyModel.create({
      ...createCompanyDto,
      createBy: {
        _id: user._id,
        email: user.email
      }
    });


  }

  async findAll(page: number, limit: number, qs: string) {

    const { filter, projection, population } = aqp(qs);

    delete filter.page;
    delete filter.limit;

    let { sort } = aqp(qs);
    let offset = (+page - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;



    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.companyModel.find(filter)
      .skip(offset) // lấy bắt đầu từ đâu
      .limit(defaultLimit) // lây bao nhiêu
      .sort(sort as any)
      .populate(population)
      .exec();


    return {
      meta: {
        current: page, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }

  }

  findOne(id: string) {
    return this.companyModel.findById({ _id: id });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {

    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found company`;
    return await this.companyModel.updateOne({ _id: id }, {
      ...updateCompanyDto,
      updateBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return `not found company`;

    await this.companyModel.updateOne({ _id: id }, {
      deleteBy: {
        _id: user._id,
        email: user.email
      }
    })

    return this.companyModel.softDelete({ _id: id })

  }
}
