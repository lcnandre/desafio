import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class CreateTagCommand {
  constructor(public readonly name: string) { }
}

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
  constructor(@InjectRepository(TagTable) private readonly repository: Repository<Tag>) { }

  async execute(command: CreateTagCommand): Promise<Tag> {
    const { name } = command;
    const tag = new Tag(name);
    const errors = await validate(tag);

    if (errors && errors.length) {
      throw new BadRequestException(errors.join(','));
    }

    return this.repository.save(tag);
  }
}
