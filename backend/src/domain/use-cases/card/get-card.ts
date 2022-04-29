import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';

export class GetCardQuery {
  constructor(public readonly id: number) { }
}

@QueryHandler(GetCardQuery)
export class GetCardHandler implements IQueryHandler<GetCardQuery> {
  constructor(@InjectRepository(CardTable) private readonly repository: Repository<Card>) { }

  async execute(query: GetCardQuery): Promise<Card> {
    const { id } = query;
    const card = await this.repository.findOne({
      where: { id },
      loadEagerRelations: true,
      relations: ['tags'],
    });

    if (!!!card) {
      throw new NotFoundException('Card não encontrado');
    }

    return card;
  }
}
