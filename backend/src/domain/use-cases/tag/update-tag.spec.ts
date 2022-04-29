import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { UpdateTagCommand, UpdateTagHandler } from './update-tag';

describe('Update tag (use case)', () => {
  let repository: Repository<Tag>;
  let originalTag: Tag;
  
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TagTable),
          useValue: createMockRepository<Tag>(Tag)
        }
      ]
    }).compile();

    repository = module.get<Repository<Tag>>(getRepositoryToken(TagTable));
    originalTag = await repository.save(new Tag('test-tag'));
  });

  it('Should update an existing tag', async () => {
    await updateTag(originalTag.id, new Tag('updated-tag'));
    const result = await fetchTag(originalTag.id);
    expect(result).toBeDefined();
    expect(result.id).toBe(originalTag.id);
    expect(result.name).toBe('updated-tag');
  });

  it('Should throw NotFoundException if the tag does not exist', async () => {
    await expect(updateTag(-1, null))
      .rejects
      .toThrow(NotFoundException);
  });

  const updateTag = (id: number, tag: Tag): Promise<Tag> => {
    const query = new UpdateTagCommand(id, tag);
    const handler = new UpdateTagHandler(repository);

    return handler.execute(query);
  };

  const fetchTag = (id: number): Promise<Tag | undefined> => {
    return repository.findOne({where: { id }});
  }
});
