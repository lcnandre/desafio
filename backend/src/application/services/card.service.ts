import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Card } from '../../domain/entities/card';
import { CreateCardCommand } from '../../domain/use-cases/card/create-card';
import { GetCardQuery } from '../../domain/use-cases/card/get-card';
import { DeleteCardCommand } from '../../domain/use-cases/card/delete-card';
import { UpdateCardCommand } from '../../domain/use-cases/card/update-card';
import { ListCardsQuery } from '../../domain/use-cases/card/list-cards';

@Injectable()
export class CardService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  createCard(text: string, tagIds: number[]): Promise<Card> {
    return this.commandBus.execute(
      new CreateCardCommand(text, tagIds)
    );
  }

  getCard(id: number): Promise<Card> {
    return this.queryBus.execute(
      new GetCardQuery(id)
    );
  }

  deleteCard(id: number): Promise<void> {
    return this.commandBus.execute(
      new DeleteCardCommand(id)
    );
  }

  updateCard(id: number, text: string, tagIds: number[]): Promise<Card> {
    return this.commandBus.execute(
      new UpdateCardCommand(id, text, tagIds)
    );
  }

  listCards(page: number, pageSize: number, tagIds?: number[], text?: string): Promise<Card[]> {
    return this.queryBus.execute(
      new ListCardsQuery(page, pageSize, tagIds, text)
    );
  }
}
