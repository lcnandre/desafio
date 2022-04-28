import { Tag } from '../../domain/entities/tag';
import { EntitySchema } from 'typeorm';

export const TagTable = new EntitySchema<Tag>({
  name: 'tags',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 30,
      unique: true,
    },
  }
});
