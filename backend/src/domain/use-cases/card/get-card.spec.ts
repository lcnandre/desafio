import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { GetCardHandler, GetCardQuery } from './get-card';

describe('Get card (use case)', () => {
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

  it('Should fetch an existing card', async () => {
    const result = await getCard(card.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Card);
  });

  it('Should throw NotFoundException if the card does not exist', async () => {
    await expect(getCard(-1))
      .rejects
      .toThrow(NotFoundException);
  });

  const getCard = (id: number): Promise<Card> => {
    const query = new GetCardQuery(id);
    const handler = new GetCardHandler(repository);

    return handler.execute(query);
  };
});
