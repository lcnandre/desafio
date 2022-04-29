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
import { GetCardHandler } from '../../domain/use-cases/card/get-card';
import { DeleteCardHandler } from '../../domain/use-cases/card/delete-card';
import { UpdateCardHandler } from '../../domain/use-cases/card/update-card';

describe('CardService', () => {
  let app: INestApplication;
  let service: CardService;
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let card: Card;
  let cardToDelete: Card;
  let cardToUpdate: Card;
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
        GetCardHandler,
        DeleteCardHandler,
        UpdateCardHandler,
      ],
    }).compile();

    service = module.get<CardService>(CardService);
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));

    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));
    card = await repository.save(new Card('Test card', initialTags));
    cardToDelete = await repository.save(new Card('Delete this card', initialTags));
    cardToUpdate = await repository.save(new Card('Update this card', initialTags));

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

  it('Should fetch an existing card', async () => {
    const result = await service.getCard(card.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Card);
  });

  it('Should delete an existing card', async () => {
    await service.deleteCard(cardToDelete.id);
    const result = await repository.findOne({ where: { id: cardToDelete.id }});
    expect(result).toBeNull();
  });

  it('Should update an existing card', async () => {
    await service.updateCard(cardToUpdate.id, 'Updated card', [initialTags[0].id]);
    const result = await repository.findOne({ where: { id: cardToUpdate.id }, loadRelationIds: true });
    expect(result).toBeDefined();
    expect(result.id).toBe(cardToUpdate.id);
    expect(result.text).toBe('Updated card');
    expect(result.tags.map(t => t.id)).toStrictEqual([initialTags[0].id]);
  });
});
