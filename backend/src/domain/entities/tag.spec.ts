import 'reflect-metadata';
import { validate } from 'class-validator';

import { Tag } from './tag';

describe('Tag (entity)', () => {
  it('Should have a name', async() => {
    const tag = new Tag(undefined);
    const errors = await validate(tag);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
    expect(Object.keys(errors[0].constraints)[0]).toBe('isDefined');
  });

  it('Should have at maximum 30 characters', async() => {
    const tag = new Tag('0000000000000000000000000000000000000000000000000');
    const errors = await validate(tag);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('name');
    expect(Object.keys(errors[0].constraints)[0]).toBe('maxLength');
  });
});
