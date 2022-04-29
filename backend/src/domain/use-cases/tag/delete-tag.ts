import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class DeleteTagCommand {
  constructor(public readonly id: number) { }
}

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(command: any): Promise<void> {
    const { id } = command;

    const exists = (await this.repository.count({
      where: { id }
    })) === 1;

    if (!exists) {
      throw new NotFoundException('Tag não encontrada');
    }

    await this.repository.delete(id);
  }
}
