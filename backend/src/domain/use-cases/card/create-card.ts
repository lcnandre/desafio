import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';

export class CreateCardCommand {
  constructor(
    public readonly text: string,
    public readonly tagIds: number[],
  ) { }
}

@CommandHandler(CreateCardCommand)
export class CreateCardHandler implements ICommandHandler<CreateCardCommand> {
  constructor(
    @InjectRepository(CardTable) private readonly repository: Repository<Card>,
    @InjectRepository(TagTable) private readonly tagRepository: Repository<Tag>,
  ) { }

  async execute(command: CreateCardCommand): Promise<Card> {
    const { text, tagIds } = command;

    const tags = await this.tagRepository.find({
      where: {
        id: In(tagIds)
      }
    });

    const card = new Card(text, tags);
    const errors = await validate(card);

    if (errors && errors.length) {
      throw new BadRequestException(errors.join(','));
    }

    return this.repository.save(card);
  }
}
