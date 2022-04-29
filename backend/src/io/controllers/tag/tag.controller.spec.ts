import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { TagController } from './tag.controller';
import { TagService } from '../../../application/services/tag.service';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagDto } from './dtos/tag.dto';
import { CreateTagHandler } from '../../../domain/use-cases/tag/create-tag';
import { GetTagHandler } from '../../../domain/use-cases/tag/get-tag';

describe('TagController', () => {
  let app: INestApplication;
  let controller: TagController;
  let repository: Repository<Tag>;
  let tag: Tag;

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
        GetTagHandler,
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    repository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    tag = await repository.save(new Tag('test-tag'));

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

  it('Should fetch an existing tag', async () => {
    const result = await controller.getTag(tag.id);
    expect(result).toBeDefined();
  });
});
