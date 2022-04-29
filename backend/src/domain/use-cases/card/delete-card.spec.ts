import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { DeleteCardCommand, DeleteCardHandler } from './delete-card';

describe('Delete card (use case)', () => {
  let repository: Repository<Card>;
  let card: Card;
  
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TagTable),
          useValue: createMockRepository<Tag>(Tag)
        },
        {
          provide: getRepositoryToken(CardTable),
          useValue: createMockRepository<Card>(Card)
        }
      ]
    }).compile();

    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));
    let tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    let initialTags: Tag[] = [
      await tagRepository.save(new Tag('tag-1')),
      await tagRepository.save(new Tag('tag-2')),
    ];

    card = await repository.save(new Card('Test card', initialTags));
  });

  it('Should delete an existing card', async () => {
    await deleteCard(card.id);
    const result = await fetchCard(card.id);
    expect(result).toBeNull();
  });

  it('Should throw NotFoundException if the card does not exist', async () => {
    await expect(deleteCard(-1))
      .rejects
      .toThrow(NotFoundException);
  });

  const deleteCard = (id: number): Promise<void> => {
    const query = new DeleteCardCommand(id);
    const handler = new DeleteCardHandler(repository);

    return handler.execute(query);
  };

  const fetchCard = (id: number): Promise<Card | undefined> => {
    return repository.findOne({where: { id }});
  }
});
