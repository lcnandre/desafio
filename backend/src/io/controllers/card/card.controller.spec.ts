import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { CardController } from './card.controller';
import { CardService } from '../../../application/services/card.service';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { Card } from '../../../domain/entities/card';
import { CardTable } from '../../../io/database/card.table';
import { CreateCardDto } from './dtos/create-card.dto';
import { CreateCardHandler } from '../../../domain/use-cases/card/create-card';

describe('CardController', () => {
  let app: INestApplication;
  let controller: CardController;
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let initialTags: Tag[] = [];

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [CardController],
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

    controller = module.get<CardController>(CardController);
    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));

    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));

    app = module.createNestApplication();
    await app.init();
  });

  it('Should create a new card given a valid text and tags', async () => {
    const dto = { text: 'Test card', tagIds: initialTags.map(t => t.id) } as CreateCardDto;
    const result = await controller.createCard(dto);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.id).toBeGreaterThan(0)
    expect(result.text).toBe('Test card');
    expect(result.tags.map(t => t.id)).toStrictEqual(initialTags.map(t => t.id));
  });
});
