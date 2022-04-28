import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTagCommand } from '../../domain/use-cases/tag/create-tag';

import { Tag } from '../../domain/entities/tag';

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
}
