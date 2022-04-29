import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from '../src/application/modules/app.module';
import { Tag } from '../src/domain/entities/tag';
import { TagTable } from '../src/io/database/tag.table';
import { CreateTagDto } from '../src/io/controllers/tag/dtos/create-tag.dto';
import { TagDto } from '../src/io/controllers/tag/dtos/tag.dto';
import { Card } from '../src/domain/entities/card';
import { CardTable } from '../src/io/database/card.table';
import { CreateCardDto } from '../src/io/controllers/card/dtos/create-card.dto';
import { CardDto } from '../src/io/controllers/card/dtos/card.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let cardRepository: Repository<Card>;
  let tagRepository: Repository<Tag>;
  let tag: Tag;
  let tagToDelete: Tag;
  let tagToUpdate: Tag;
  let initialTags: Tag[] = [];
  let card: Card;
  let cardToDelete: Card;

  beforeAll(async () => {
    process.env.TYPEORM_CONNECTION = 'sqlite';
    process.env.TYPEORM_DATABASE = ':memory:';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    tagRepository = moduleFixture.get<Repository<Tag>>(getRepositoryToken(TagTable));
    tag = await tagRepository.save(new Tag('test-tag'));
    tagToDelete = await tagRepository.save(new Tag('delete-tag'));
    tagToUpdate = await tagRepository.save(new Tag('update-this-tag'));

    cardRepository = moduleFixture.get<Repository<Card>>(getRepositoryToken(CardTable));
    initialTags.push(await tagRepository.save(new Tag('tag-1')));
    initialTags.push(await tagRepository.save(new Tag('tag-2')));
    card = await cardRepository.save(new Card('Test card', initialTags));
    cardToDelete = await cardRepository.save(new Card('Delete this card', initialTags));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.FOUND);
  });

  it('/tags/ (POST)', () => {
    const payload = { name: 'test-tag-2' } as CreateTagDto;

    return request(app.getHttpServer())
      .post('/tags')
      .type('json')
      .send(payload)
      .expect(HttpStatus.CREATED)
      .then(checkTagDtoResponse);
  });

  it('/tags/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/tags/${tag.id}`)
      .expect(HttpStatus.OK)
      .then(checkTagDtoResponse);
  });

  it('/tags/ (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/tags/${tagToDelete.id}`)
      .expect(HttpStatus.OK);
  });

  it('/tags/ (PATCH)', () => {
    const payload = { name: 'updated-tag' } as CreateTagDto;

    return request(app.getHttpServer())
      .patch(`/tags/${tagToUpdate.id}`)
      .type('json')
      .send(payload)
      .expect(HttpStatus.OK)
      .then((res) => {
        const result = res.body as TagDto;
        expect(result).toBeDefined();
        expect(result.id).toBe(tagToUpdate.id);
        expect(result.name).toBe('updated-tag');
      });
  });

  it('/cards/ (POST)', () => {
    const payload = { text: 'Test card', tagIds: initialTags.map(t => t.id) } as CreateCardDto;

    return request(app.getHttpServer())
      .post('/cards')
      .type('json')
      .send(payload)
      .expect(HttpStatus.CREATED)
      .then(checkCardDtoResponse);
  });

  it('/cards/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/cards/${card.id}`)
      .expect(HttpStatus.OK)
      .then(checkCardDtoResponse);
  });

  it('/cards/ (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/cards/${cardToDelete.id}`)
      .expect(HttpStatus.OK);
  });

  const checkTagDtoResponse = (res: any): void => {
    const result = res.body as TagDto;
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  }

  const checkCardDtoResponse = (res: any): void => {
    const result = res.body as CardDto;
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.text).toBeDefined();
    expect(result.tags).toBeDefined();
    expect(result.tags.length).toBeGreaterThan(0);
  }
});
