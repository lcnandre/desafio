/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagTable } from '../../io/database/tag.table';
import { CardTable } from '../../io/database/card.table';
import { CardService } from '../services/card.service';
import { CardController } from '../../io/controllers/card/card.controller';
import { CreateCardHandler } from '../../domain/use-cases/card/create-card';
import { GetCardHandler } from '../../domain/use-cases/card/get-card';
import { DeleteCardHandler } from '../../domain/use-cases/card/delete-card';
import { UpdateCardHandler } from '../../domain/use-cases/card/update-card';
import { ListCardsHandler } from '../../domain/use-cases/card/list-cards';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TagTable, CardTable])
  ],
  providers: [
    CardService,
    CreateCardHandler,
    GetCardHandler,
    DeleteCardHandler,
    UpdateCardHandler,
    ListCardsHandler,
  ],
  controllers: [CardController],
  exports: [CqrsModule],
})
export class CardModule { }
