import { Body, Controller,Delete,Get,Param,Patch,Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CardService } from '../../../application/services/card.service';
import { CardDto } from './dtos/card.dto';
import { CreateCardDto } from './dtos/create-card.dto';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly service: CardService) { }

  @Post('/')
  @ApiCreatedResponse({ type: CardDto })
  async createCard(@Body() dto: CreateCardDto): Promise<CardDto> {
    const card = await this.service.createCard(dto.text, dto.tagIds);
    return CardDto.fromCard(card);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiCreatedResponse({ type: CardDto})
  async getCard(@Param('id') id: number): Promise<CardDto> {
    const tag = await this.service.getCard(id);
    return CardDto.fromCard(tag);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', example: 1})
  deleteCard(@Param('id') id: number): Promise<void> {
    return this.service.deleteCard(id);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiCreatedResponse({ type: CardDto })
  async updateCard(@Param('id') id: number, @Body() dto: CreateCardDto) {
    const card = await this.service.updateCard(id, dto.text, dto.tagIds);
    return CardDto.fromCard(card);
  }

  @Get('/')
  @ApiQuery({ name: 'page', example: '1' })
  @ApiQuery({ name: 'pageSize', example: '4', required: false })
  @ApiQuery({ name: 'tagIds', example: '1,2' })
  @ApiCreatedResponse({ type: CardDto, isArray: true })
  async listCards(@Query('page') page: number, @Query('pageSize') pageSize?: number, @Query('tagIds') tagIds?: undefined | number | number[]): Promise<CardDto[]> {
    const result = await this.service.listCards(+page, +(pageSize | 4), this.getTagIds(tagIds));
    return result.map(CardDto.fromCard);
  }

  private getTagIds(tagIds?: undefined | number | number[]): number[] | undefined {
    if (!!!tagIds) {
      return undefined;
    }

    if (Array.isArray(tagIds)) {
      return tagIds.map(t => +t);
    }

    return [+tagIds];
  }
}
