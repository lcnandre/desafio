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
import { GetCardHandler } from '../../../domain/use-cases/card/get-card';
import { DeleteCardHandler } from '../../../domain/use-cases/card/delete-card';
import { UpdateCardHandler } from '../../../domain/use-cases/card/update-card';
import { ListCardsHandler } from '../../../domain/use-cases/card/list-cards';

describe('CardController', () => {
  let app: INestApplication;
  let controller: CardController;
  let repository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let initialTags: Tag[] = [];
  let card: Card;
  let cardToDelete: Card;
  let cardToUpdate: Card;

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
        GetCardHandler,
        DeleteCardHandler,
        UpdateCardHandler,
        ListCardsHandler,
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
    repository = module.get<Repository<Card>>(getRepositoryToken(CardTable));
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));

    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));
    card = await repository.save(new Card('Test card', initialTags));
    cardToDelete = await repository.save(new Card('Delete this card', initialTags));
    cardToUpdate = await repository.save(new Card('Update this card', initialTags));

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

  it('Should fetch an existing card', async () => {
    const result = await controller.getCard(card.id);
    expect(result).toBeDefined();
  });

  it('Should delete an existing card', async () => {
    await controller.deleteCard(cardToDelete.id);
    const result = await repository.findOne({ where: { id: cardToDelete.id }});
    expect(result).toBeNull();
  });

  it('Should update an existing tag', async () => {
    const dto = { text: 'Updated card', tagIds: [initialTags[0].id] } as CreateCardDto;
    await controller.updateCard(cardToUpdate.id, dto);
    const result = await repository.findOne({ where: { id: cardToUpdate.id }});
    expect(result).toBeDefined();
    expect(result.id).toBe(cardToUpdate.id);
    expect(result.text).toBe('Updated card');
    expect(result.tags.map(t => t.id)).toStrictEqual([initialTags[0].id]);
    expect(result.updatedTime).toBeDefined();
  });

  it('Should list cards', async () => {
    let result = await controller.listCards(1, 4);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);

    result = await controller.listCards(1, 4, initialTags[0].name);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
  });
});
