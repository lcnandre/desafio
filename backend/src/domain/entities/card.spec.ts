import 'reflect-metadata';
import { validate } from 'class-validator';

import { Card } from './card';
import { Tag } from './tag';

describe('Card (entity)', () => {
  it('Should have a valid text and tags', async() => {
    const card = new Card(undefined, undefined);
    const errors = await validate(card);
    expect(errors).toHaveLength(2);
    expect(errors[0].property).toBe('text');
    expect(errors[1].property).toBe('tags');
  });

  it('Should have at maximum 300 characters', async() => {
    const card = new Card(
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      [new Tag('test-tag')]
    );
    const errors = await validate(card);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('text');
    expect(Object.keys(errors[0].constraints)[0]).toBe('maxLength');
  });

  it('On creation, creationTime should be set automatically', () => {
    const card = new Card('Test card', undefined);
    expect(card.creationTime).toBeDefined();
    expect(card.creationTime).toBeInstanceOf(Date);
  });

  it('Should have at least one tag', async() => {
    const card = new Card('Test card', []);
    const errors = await validate(card);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('tags');
    expect(Object.keys(errors[0].constraints)[0]).toBe('arrayNotEmpty');
  });

  it('Tag may not be duplicated', async() => {
    const tag = new Tag('test-tag');
    const card = new Card('Test card', [tag, tag]);
    const errors = await validate(card);
    expect(errors).toHaveLength(1);
    expect(Object.keys(errors[0].constraints)[0]).toBe('arrayUnique');
  });
});
