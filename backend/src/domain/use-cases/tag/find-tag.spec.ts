import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { GetTagHandler, GetTagQuery } from './find-tag';

describe('Find tag (use case)', () => {
  let repository: Repository<Tag>;
  
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
    await repository.save(new Tag('test-tag'));
  });

  it('Should fetch an existing tag', async () => {
    const result = await findTag('test');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });

  const findTag = (name: string): Promise<Tag[]> => {
    const query = new GetTagQuery(3, name);
    const handler = new GetTagHandler(repository);

    return handler.execute(query);
  };
});
