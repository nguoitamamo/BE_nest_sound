import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';


import { UsersService } from '../users/users.service.js';
import { SongsService } from '../songs/songs.service.js';


// @ValidatorConstraint({ name: 'IsUnique', async: true })
// @Injectable()
// export class IsUnique implements ValidatorConstraintInterface {
//     constructor(private readonly entityManager: EntityManager) { }

//     async validate(value: any, args?: ValidationArguments): Promise<boolean> {
//         const [tableName, column] = args?.constraints as string[]
//         console.log(tableName);
//         const dataExist = await this.entityManager
//             .getRepository(tableName)
//             .createQueryBuilder(tableName)
//             .where({ [column]: value })
//             .getExists()

//         return !dataExist
//     }

//     defaultMessage(args: ValidationArguments): string {
//         return `${args.property} already exists`;
//     }
// }


@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        private readonly userService: UsersService,
        private readonly songService: SongsService,
    ) { }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {

        const { schema, column } = args.constraints[0];
        console.log(schema, column);

        const serviceMap = {
            user: this.userService,
            song: this.songService,
        };

        const service = serviceMap[schema];
        const found = await service.isSchemaExits(column, value)
        return !found;
        // }
    }

    defaultMessage(args: ValidationArguments): string {
        const { schema, column } = args.constraints[0];
        return `${column} ${schema}  đã được sử dụng`;
    }
}