import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { ListCardsHandler, ListCardsQuery } from './list-cards';

describe('List cards (use case)', () => {
  let repository: Repository<Card>;
  let initialTags: Tag[];
  
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
    initialTags = [
      await tagRepository.save(new Tag('tag-1')),
      await tagRepository.save(new Tag('tag-2')),
    ];

    await repository.save(new Card('Test card', initialTags));
    await repository.save(new Card('Another test card', [initialTags[1]]));
  });

  it('Should list all cards without filter', async () => {
    const result = await listCards();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2);
  });

  it('Should list only cards from specified tags with filter', async () => {
    const result = await listCards([initialTags[0].id]);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });

  it('Should only list cards that contains text with filter', async () => {
    const result = await listCards(undefined, 'Another');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });

  const listCards = (tagIds?: number[], text?: string): Promise<Card[]> => {
    const query = new ListCardsQuery(1, 4, tagIds, text);
    const handler = new ListCardsHandler(repository);

    return handler.execute(query);
  };
});
