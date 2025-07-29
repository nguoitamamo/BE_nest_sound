import { Controller } from '@nestjs/common';
import { DatabasesService } from './databases.service.js';


@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}
}
