import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { TagService } from '../../../application/services/tag.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagDto } from './dtos/tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly service: TagService) { }

  @Post('/')
  @ApiCreatedResponse({ type: TagDto })
  async createTag(@Body() dto: CreateTagDto): Promise<TagDto> {
    const tag = await this.service.createTag(dto.name);
    return TagDto.fromTag(tag);
  }

  @Get('/:id')
  @ApiCreatedResponse({ type: TagDto})
  async getTag(@Param('id') id: number): Promise<TagDto> {
    const tag = await this.service.getTag(id);
    return TagDto.fromTag(tag);
  }
}
