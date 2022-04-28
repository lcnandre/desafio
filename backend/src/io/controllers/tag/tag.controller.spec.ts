import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { TagController } from './tag.controller';
import { TagService } from '../../../application/services/tag.service';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { CreateTagHandler } from '../../../domain/use-cases/tag/create-tag';
import { CreateTagDto } from './dtos/create-tag.dto';

describe('TagController', () => {
  let app: INestApplication;
  let controller: TagController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [TagController],
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagTable),
          useValue: createMockRepository<Tag>(Tag),
        },
        CreateTagHandler,
      ],
    }).compile();

    controller = module.get<TagController>(TagController);

    app = module.createNestApplication();
    await app.init();
  });

  it('Should create a new tag given a valid name', async () => {
    const dto = { name: 'test-tag' } as CreateTagDto;
    const result = await controller.createTag(dto);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.id).toBeGreaterThan(0)
    expect(result.name).toBe('test-tag');
  });
});
