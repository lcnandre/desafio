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
import { CreateTagHandler } from '../../../domain/use-cases/tag/create-tag';
import { GetTagHandler } from '../../../domain/use-cases/tag/find-tag';
import { DeleteTagHandler } from '../../../domain/use-cases/tag/delete-tag';
import { UpdateTagHandler } from '../../../domain/use-cases/tag/update-tag';

describe('TagController', () => {
  let app: INestApplication;
  let controller: TagController;
  let repository: Repository<Tag>;
  let tagToDelete: Tag;
  let tagToUpdate: Tag;

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
        DeleteTagHandler,
        UpdateTagHandler,
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    repository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    await repository.save(new Tag('test-tag'));
    tagToDelete = await repository.save(new Tag('delete-tag'));
    tagToUpdate = await repository.save(new Tag('update-this-tag'));

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

  it('Should find an existing tag', async () => {
    const result = await controller.findTag(3, 'test');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('Should delete an existing tag', async () => {
    await controller.deleteTag(tagToDelete.id);
    const result = await repository.findOne({ where: { id: tagToDelete.id }});
    expect(result).toBeNull();
  });

  it('Should update an existing tag', async () => {
    const dto = { name: 'updated-tag' } as CreateTagDto;
    await controller.updateTag(tagToUpdate.id, dto);
    const result = await repository.findOne({ where: { id: tagToUpdate.id }});
    expect(result).toBeDefined();
    expect(result.id).toBe(tagToUpdate.id);
    expect(result.name).toBe('updated-tag');
  });
});
