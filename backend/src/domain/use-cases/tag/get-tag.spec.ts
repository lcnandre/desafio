import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { GetTagHandler, GetTagQuery } from './get-tag';

describe('Get tag (use case)', () => {
  let repository: Repository<Tag>;
  let tag: Tag;
  
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
    tag = await repository.save(new Tag('test-tag'));
  });

  it('Should fetch an existing tag', async () => {
    const result = await getTag(tag.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Tag);
  });

  it('Should throw NotFoundException if the tag does not exist', async () => {
    await expect(getTag(-1))
      .rejects
      .toThrow(NotFoundException);
  });

  const getTag = (id: number): Promise<Tag> => {
    const query = new GetTagQuery(id);
    const handler = new GetTagHandler(repository);

    return handler.execute(query);
  };
});
