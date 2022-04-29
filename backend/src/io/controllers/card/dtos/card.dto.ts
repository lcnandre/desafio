import { ApiProperty } from '@nestjs/swagger';
import * as moment from 'moment-timezone';

import { Card } from '../../../../domain/entities/card';
import { TagDto } from '../../tag/dtos/tag.dto';

export class CardDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  creationTime: string;
  
  @ApiProperty()
  updatedTime: string;
  
  @ApiProperty()
  text: string;

  @ApiProperty()
  tags: TagDto[];

  static fromCard(card: Card) {
    if (!!!card) {
      return undefined;
    }

    return {
      id: card.id,
      creationTime: moment(card.creationTime).tz('America/Sao_Paulo').format('DD/MM/YYYY h:mm:ss'),
      updatedTime: moment(card.updatedTime).tz('America/Sao_Paulo').format('DD/MM/YYYY h:mm:ss'),
      text: card.text,
      tags: card.tags.map(t => TagDto.fromTag(t)),
    } as CardDto;
  }
}
