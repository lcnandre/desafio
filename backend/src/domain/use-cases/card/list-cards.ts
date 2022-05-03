import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Like, Repository } from 'typeorm';

import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';

export class ListCardsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
    public readonly text?: string,
  ) { }
}

@QueryHandler(ListCardsQuery)
export class ListCardsHandler implements IQueryHandler<ListCardsQuery> {
  constructor(@InjectRepository(CardTable) private readonly repository: Repository<Card>) { }

  execute(query: ListCardsQuery): Promise<Card[]> {
    const { page, pageSize, text } = query;
    const queryOptions: FindManyOptions<Card> = {
      take: pageSize,
      skip: pageSize * (page - 1),
      select: {
        id: true,
        creationTime: true,
        updatedTime: true,
        text: true,
        tags: {
          id: true,
          name: true,
        }
      },
      relations: ['tags'],
      loadEagerRelations: true,
      order: {
        updatedTime: 'DESC',
        creationTime: 'DESC',
      }
    };

    if (text && text.length) {
      queryOptions.where = [
        {
          text: Like(`%${text}%`),
        },
        {
          tags: {
            name: Like(`%${text}%`)
          }
        }
      ];
    }

    return this.repository.find(queryOptions);
  }
}
