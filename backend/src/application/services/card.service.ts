import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Card } from '../../domain/entities/card';
import { CreateCardCommand } from '../../domain/use-cases/card/create-card';

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
}
