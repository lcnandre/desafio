import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class UpdateTagCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) { }
}

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(command: UpdateTagCommand): Promise<Tag> {
    const { id, name } = command;

    let currentTag = await this.repository.findOne({ where: { id } });

    if (!!!currentTag) {
      throw new NotFoundException('Tag não encontrada');
    }

    this.repository.merge(currentTag, new Tag(name));
    const errors = await validate(currentTag);

    if (errors && errors.length) {
      throw new BadRequestException(errors.join(','));
    }

    return this.repository.save(currentTag);
  }
}
