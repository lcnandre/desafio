import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { TagService } from '../../../application/services/tag.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagDto } from './dtos/tag.dto';
import { Tag } from '../../../domain/entities/tag';

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

  @Delete('/:id')
  deleteTag(@Param('id') id: number): Promise<void> {
    return this.service.deleteTag(id);
  }

  @Patch('/:id')
  async updateTag(@Param('id') id: number, @Body() dto: CreateTagDto) {
    let tag = new Tag(dto.name);
    tag = await this.service.updateTag(id, tag);
    return TagDto.fromTag(tag);
  }
}
