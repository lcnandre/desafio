import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from '../src/application/modules/app.module';
import { Tag } from '../src/domain/entities/tag';
import { TagTable } from '../src/io/database/tag.table';
import { CreateTagDto } from '../src/io/controllers/tag/dtos/create-tag.dto';
import { TagDto } from '../src/io/controllers/tag/dtos/tag.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Tag>;
  let tag: Tag;

  beforeAll(async () => {
    process.env.TYPEORM_CONNECTION = 'sqlite';
    process.env.TYPEORM_DATABASE = ':memory:';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleFixture.get<Repository<Tag>>(getRepositoryToken(TagTable));
    tag = await repository.save(new Tag('test-tag'));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(302);
  });

  it('/tags/ (POST)', () => {
    const payload = { name: 'test-tag-2' } as CreateTagDto;

    return request(app.getHttpServer())
      .post('/tags')
      .type('json')
      .send(payload)
      .expect(201)
      .then(res => {
        const result = res.body as TagDto;
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
      });
  });

  it('/tags/ (GET)', () => {
    return request(app.getHttpServer())
      .get(`/tags/${tag.id}`)
      .expect(200)
      .then(res => {
        const result = res.body as TagDto;
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
      });
  });
});
