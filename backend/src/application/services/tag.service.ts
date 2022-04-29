import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Tag } from '../../domain/entities/tag';
import { CreateTagCommand } from '../../domain/use-cases/tag/create-tag';
import { GetTagQuery } from '../../domain/use-cases/tag/get-tag';
import { DeleteTagCommand } from '../../domain/use-cases/tag/delete-tag';

@Injectable()
export class TagService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  createTag(name: string): Promise<Tag> {
    return this.commandBus.execute(
      new CreateTagCommand(name)
    );
  }

  getTag(id: number): Promise<Tag> {
    return this.queryBus.execute(
      new GetTagQuery(id)
    );
  }

  deleteTag(id: number): Promise<void> {
    return this.commandBus.execute(
      new DeleteTagCommand(id)
    );
  }
}
