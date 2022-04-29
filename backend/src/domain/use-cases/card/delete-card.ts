import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Card } from '../../entities/card';
import { CardTable } from '../../../io/database/card.table';

export class DeleteCardCommand {
  constructor(public readonly id: number) { }
}

@CommandHandler(DeleteCardCommand)
export class DeleteCardHandler implements ICommandHandler {
  constructor(@InjectRepository(CardTable) private readonly repository: Repository<Card>) { }

  async execute(command: any): Promise<void> {
    const { id } = command;

    const exists = (await this.repository.count({
      where: { id }
    })) === 1;

    if (!exists) {
      throw new NotFoundException('Card não encontrado');
    }

    await this.repository.delete(id);
  }
}
