import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../test/mocks/repository.mock';
import { CardService } from './card.service';
import { Tag } from '../../domain/entities/tag';
import { TagTable } from '../../io/database/tag.table';
import { Card } from '../../domain/entities/card';
import { CardTable } from '../../io/database/card.table';
import { CreateCardHandler } from '../../domain/use-cases/card/create-card';

describe('CardService', () => {
  let app: INestApplication;
  let service: CardService;
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let initialTags: Tag[] = [];

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CardService,
        {
          provide: getRepositoryToken(TagTable),
          useValue: createMockRepository<Tag>(Tag),
        },
        {
          provide: getRepositoryToken(CardTable),
          useValue: createMockRepository<Card>(Card),
        },
        CreateCardHandler,
      ],
    }).compile();

    service = module.get<CardService>(CardService);
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));

    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));

    app = module.createNestApplication();
    await app.init();
  });

  it('Should create a new card given a valid text and tags', async () => {
    const result = await service.createCard('Test card', initialTags.map(t => t.id));
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
    expect(result.text).toBe('Test card');
    expect(result.tags.map(t => t.id)).toStrictEqual(initialTags.map(t => t.id));
  });
});
