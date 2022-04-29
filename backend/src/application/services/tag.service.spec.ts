import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import createMockRepository from '../../../test/mocks/repository.mock';
import { TagService } from '../../application/services/tag.service';
import { Tag } from '../../domain/entities/tag';
import { TagTable } from '../../io/database/tag.table';
import { CreateTagHandler } from '../../domain/use-cases/tag/create-tag';
import { GetTagHandler } from '../../domain/use-cases/tag/get-tag';
import { DeleteTagHandler } from '../../domain/use-cases/tag/delete-tag';
import { UpdateTagHandler } from '../../domain/use-cases/tag/update-tag';

describe('TagService', () => {
  let app: INestApplication;
  let service: TagService;
  let repository: Repository<Tag>;
  let tag: Tag;
  let tagToDelete: Tag;
  let tagToUpdate: Tag;

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
        GetTagHandler,
        DeleteTagHandler,
        UpdateTagHandler,
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    repository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    tag = await repository.save(new Tag('test-tag'));
    tagToDelete = await repository.save(new Tag('delete-tag'));
    tagToUpdate = await repository.save(new Tag('update-this-tag'));

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

  it('Should fetch an existing tag', async () => {
    const result = await service.getTag(tag.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Tag);
  });

  it('Should delete an existing tag', async () => {
    await service.deleteTag(tagToDelete.id);
    const result = await repository.findOne({ where: { id: tagToDelete.id }});
    expect(result).toBeNull();
  });

  it('Should update an existing tag', async () => {
    await service.updateTag(tagToUpdate.id, new Tag('updated-tag'));
    const result = await repository.findOne({ where: { id: tagToUpdate.id }});
    expect(result).toBeDefined();
    expect(result.id).toBe(tagToUpdate.id);
    expect(result.name).toBe('updated-tag');
  });
});
