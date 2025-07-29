import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto.js';


export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {}
