import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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

  @Get('/')
  @ApiQuery({ name: 'pageSize', example: '3', required: false })
  @ApiQuery({ name: 'name', example: 'my-tag', required: true })
  @ApiCreatedResponse({ type: TagDto, isArray: true })
  async findTag(@Query('pageSize') pageSize: number, @Query('name') name: string): Promise<TagDto[]> {
    const result = await this.service.findTags(+(pageSize | 3), name);
    return result.map(TagDto.fromTag);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', example: 1 })
  deleteTag(@Param('id') id: number): Promise<void> {
    return this.service.deleteTag(id);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiCreatedResponse({ type: TagDto })
  async updateTag(@Param('id') id: number, @Body() dto: CreateTagDto) {
    const tag = await this.service.updateTag(id, dto.name);
    return TagDto.fromTag(tag);
  }
}
