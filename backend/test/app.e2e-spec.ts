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

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Tag>;
  let tag: Tag;
  let tagToDelete: Tag;
  let tagToUpdate: Tag;

  beforeAll(async () => {
    process.env.TYPEORM_CONNECTION = 'sqlite';
    process.env.TYPEORM_DATABASE = ':memory:';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleFixture.get<Repository<Tag>>(getRepositoryToken(TagTable));
    tag = await repository.save(new Tag('test-tag'));
    tagToDelete = await repository.save(new Tag('delete-tag'));
    tagToUpdate = await repository.save(new Tag('update-this-tag'));

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

  const checkTagDtoResponse = (res: any): void => {
    const result = res.body as TagDto;
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBeDefined();
  }
});
