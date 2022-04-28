import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../test/mocks/repository.mock';
import { TagService } from '../../application/services/tag.service';
import { Tag } from '../../domain/entities/tag';
import { TagTable } from '../../io/database/tag.table';
import { CreateTagHandler } from '../../domain/use-cases/tag/create-tag';

describe('TagService', () => {
  let app: INestApplication;
  let service: TagService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagTable),
          useValue: createMockRepository<Tag>(Tag),
        },
        CreateTagHandler,
      ],
    }).compile();

    service = module.get<TagService>(TagService);

    app = module.createNestApplication();
    await app.init();
  });

  it('Should create a new tag given a valid name', async () => {
    const result = await service.createTag('test-tag');
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.id).toBeGreaterThan(0)
    expect(result.name).toBe('test-tag');
  });
});
