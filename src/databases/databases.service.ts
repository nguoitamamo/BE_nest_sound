import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from '../permissions/schemas/permission.schema.js';
import { Role, RoleDocument } from '../roles/schemas/role.schema.js';
import { User, UserDocument } from '../users/schemas/user.schema.js';
import { UsersService } from '../users/users.service.js';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample.js';


@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);

    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private userService: UsersService
    ) { }


    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT");
        if (Boolean(isInit)) {


            const countPermission = await this.permissionModel.count({});
            const countRole = await this.roleModel.count({});

            //create permissions
            if (countPermission === 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
                //bulk create
            }

            // create role
            if (countRole === 0) {
                const permissions = await this.permissionModel.find({}).select("_id");
                await this.roleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: "Admin thì full quyền :v",
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: "Người dùng sử dụng hệ thống",
                        isActive: true,
                        permissions: [] //không set quyền, chỉ cần add ROLE
                    }
                ]);
            }


            const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
            const userRole = await this.roleModel.findOne({ name: USER_ROLE })

            // thêm phần nếu use có email là "admin@gmail.com" thì gán adminRole còn lại userRole
            const updateOthersResult = await this.userModel.updateMany(
                { email: { $ne: 'admin@gmail.com' }, role: { $ne: userRole._id } }, // Chỉ cập nhật những người KHÔNG phải admin và CHƯA CÓ role USER_ROLE
                { $set: { role: userRole._id } } // Gán tên vai trò "USER"
            );

            await this.userModel.updateOne({ _id: '6879faad8642c7ee5da7a8fa' }, { role: adminRole._id });


            if (countRole > 0 && countPermission > 0) {
                this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
            }
        }
    }
}
