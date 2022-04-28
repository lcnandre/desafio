import { IsDefined, MaxLength } from 'class-validator';
import { Card } from './card';

export class Tag {
  id: number;

  @IsDefined()
  @MaxLength(30)
  name: string;

  cards: Card[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
