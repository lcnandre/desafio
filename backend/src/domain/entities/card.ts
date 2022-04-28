import { ArrayNotEmpty, ArrayUnique, IsArray, IsDefined, MaxLength } from 'class-validator';
import { Tag } from './tag';

export class Card {
  id: number;
  creationTime: Date;
  updatedTime: Date;

  @IsDefined()
  @MaxLength(300)
  text: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  tags: Tag[] = [];

  constructor(text: string, tags: Tag[]) {
    this.creationTime = new Date();
    this.text = text;
    this.tags = tags;
  }
}
