import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Tag } from '../../entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class GetTagQuery {
  constructor(
    public readonly pageSize: number,
    public readonly name: string,
  ) { }
}

@QueryHandler(GetTagQuery)
export class GetTagHandler implements IQueryHandler<GetTagQuery> {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(query: GetTagQuery): Promise<Tag[]> {
    const { pageSize, name } = query;
    return this.repository.find({
      take: pageSize,
      select: {
        id: true,
        name: true,
      },
      where: {
        name: Like(`${name}%`),
      },
    });
  }
}
