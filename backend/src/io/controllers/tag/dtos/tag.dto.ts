import { ApiProperty } from '@nestjs/swagger';

import { Tag } from '../../../../domain/entities/tag';

export class TagDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  static fromTag(tag: Tag) {
    return {
      id: tag.id,
      name: tag.name,
    } as TagDto;
  }
}
