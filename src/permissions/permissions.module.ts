import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './schemas/permission.schema.js';
import { PermissionsController } from './permissions.controller.js';
import { PermissionsService } from './permissions.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule { }
