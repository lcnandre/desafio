import { Body, Controller,Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
}
