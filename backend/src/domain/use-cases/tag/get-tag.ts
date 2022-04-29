import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class GetTagQuery {
  constructor(public readonly id: number) { }
}

@QueryHandler(GetTagQuery)
export class GetTagHandler implements IQueryHandler<GetTagQuery> {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(query: GetTagQuery): Promise<Tag> {
    const { id } = query;
    const tag = await this.repository.findOne({
      where: { id }
    });

    if (!!!tag) {
      throw new NotFoundException('Tag não encontrada');
    }

    return tag;
  }
}
