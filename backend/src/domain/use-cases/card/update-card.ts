import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { In, Repository } from 'typeorm';

import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';

export class UpdateCardCommand {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly tagIds: number[],
  ) { }
}

@CommandHandler(UpdateCardCommand)
export class UpdateCardHandler implements ICommandHandler<UpdateCardCommand> {
  constructor(
    @InjectRepository(CardTable) private readonly repository: Repository<Card>,
    @InjectRepository(TagTable) private readonly tagRepository: Repository<Tag>,
  ) { }

  async execute(command: UpdateCardCommand): Promise<Card> {
    const { id, text, tagIds } = command;

    let currentCard = await this.repository.findOne({ where: { id } });

    if (!!!currentCard) {
      throw new NotFoundException('Card não encontrado');
    }

    const tags = await this.tagRepository.find({
      where: {
        id: In(tagIds)
      }
    });

    this.repository.merge(
      currentCard,
      { text, tags, updatedTime: new Date() }
    );
    const errors = await validate(currentCard);

    if (errors && errors.length) {
      throw new BadRequestException(errors.join(','));
    }

    return this.repository.save(currentCard);
  }
}
