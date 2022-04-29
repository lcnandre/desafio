import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { UpdateCardCommand, UpdateCardHandler } from './update-card';

describe('Update card (use case)', () => {
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let originalCard: Card;
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
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    initialTags = [
      await tagRepository.save(new Tag('tag-1')),
      await tagRepository.save(new Tag('tag-2')),
    ];

    originalCard = await repository.save(new Card('Test card', initialTags));
  });

  it('Should update an existing card', async () => {
    await updateCard(originalCard.id, 'Updated card', [initialTags[0].id]);
    const result = await fetchCard(originalCard.id);
    expect(result).toBeDefined();
    expect(result.id).toBe(originalCard.id);
    expect(result.text).toBe('Updated card');
    expect(result.tags.map(t => t.id)).toStrictEqual([initialTags[0].id]);
    expect(result.updatedTime).toBeDefined();
  });

  it('Should throw NotFoundException if the card does not exist', async () => {
    await expect(updateCard(-1, null, null))
      .rejects
      .toThrow(NotFoundException);
  });

  it('Should throw BadRequestException without a valid name or tags', async () => {
    await expect(updateCard(originalCard.id, undefined, []))
      .rejects
      .toThrow(BadRequestException);
  });

  const updateCard = (id: number, text: string, tagIds: number[]): Promise<Card> => {
    const query = new UpdateCardCommand(id, text, tagIds);
    const handler = new UpdateCardHandler(repository, tagRepository);

    return handler.execute(query);
  };

  const fetchCard = (id: number): Promise<Card | undefined> => {
    return repository.findOne({where: { id }});
  }
});
