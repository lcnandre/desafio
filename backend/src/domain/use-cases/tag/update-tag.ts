import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class UpdateTagCommand {
  constructor(
    public readonly id: number,
    public readonly tag: Tag
  ) { }
}

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(command: UpdateTagCommand): Promise<Tag> {
    const { id, tag } = command;

    let currentTag = await this.repository.findOne({ where: { id } });

    if (!!!currentTag) {
      throw new NotFoundException('Tag não encontrada');
    }

    this.repository.merge(currentTag, tag);
    return this.repository.save(currentTag);
  }
}