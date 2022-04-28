import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import createMockRepository from '../../../../test/mocks/repository.mock';
import { Tag } from '../../../domain/entities/tag';
import { TagTable } from '../../../io/database/tag.table';
import { CreateTagCommand, CreateTagHandler } from './create-tag';

describe('Create tag (use case)', () => {
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
  });

  it('Should create a tag given a valid name', async () => {
    const result = await createTag('test-tag');
    expect(result).toBeDefined();
    expect(result.id).toBeGreaterThan(0);
    expect(result.name).toBe('test-tag');
  });

  it('Should throw BadRequestException without a valid name', async () => {
    await expect(createTag(undefined))
      .rejects
      .toThrow(BadRequestException);
  });

  const createTag = (name: string): Promise<Tag> => {
    const command = new CreateTagCommand(name);
    const handler = new CreateTagHandler(repository);

    return handler.execute(command);
  };
});
