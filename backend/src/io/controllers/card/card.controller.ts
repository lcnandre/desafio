import { Body, Controller,Delete,Get,Param,Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

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
}
