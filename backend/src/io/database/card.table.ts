import { Card } from '../../domain/entities/card';
import { EntitySchema } from 'typeorm';

export const CardTable = new EntitySchema<Card>({
  name: 'cards',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    creationTime: {
      type: Date,
    },
    updatedTime: {
      type: Date,
      nullable: true,
    },
    text: {
      type: 'varchar',
      length: 300,
    }
  },
  relations: {
    tags: {
      type: 'many-to-many',
      target: 'tags',
      joinTable: true,
      inverseSide: 'posts',
    }
  }
});
