import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { CreateCardCommand, CreateCardHandler } from './create-card';

describe('Create card (use case)', () => {
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let initialTags: Tag[] = [];
  
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

    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));

    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));
  });

  it('Should create a card given a valid text and tags', async () => {
    const result = await createCard('Test card', initialTags);
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
    expect(result.text).toBe('Test card');
    expect(result.tags.map(t => t.id)).toStrictEqual(initialTags.map(t => t.id));
  });

  it('Should throw BadRequestException without a valid text or tags', async () => {
    await expect(createCard(undefined, []))
      .rejects
      .toThrow(BadRequestException);
  });

  const createCard = (text: string, tags: Tag[]): Promise<Card> => {
    const command = new CreateCardCommand(text, tags.map(t => t.id));
    const handler = new CreateCardHandler(repository, tagRepository);

    return handler.execute(command);
  };
});
