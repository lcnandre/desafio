import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { DeleteTagCommand, DeleteTagHandler } from './delete-tag';

describe('Delete tag (use case)', () => {
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

  it('Should delete an existing tag', async () => {
    await deleteTag(tag.id);
    const result = await fetchTag(tag.id);
    expect(result).toBeNull();
  });

  it('Should throw NotFoundException if the tag does not exist', async () => {
    await expect(deleteTag(-1))
      .rejects
      .toThrow(NotFoundException);
  });

  const deleteTag = (id: number): Promise<void> => {
    const query = new DeleteTagCommand(id);
    const handler = new DeleteTagHandler(repository);

    return handler.execute(query);
  };

  const fetchTag = (id: number): Promise<Tag | undefined> => {
    return repository.findOne({where: { id }});
  }
});
