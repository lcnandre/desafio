/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagTable } from '../../io/database/tag.table';
import { TagService } from '../services/tag.service';
import { TagController } from '../../io/controllers/tag/tag.controller';
import { CreateTagHandler } from '../../domain/use-cases/tag/create-tag';
import { GetTagHandler } from '../../domain/use-cases/tag/get-tag';
import { DeleteTagHandler } from '../../domain/use-cases/tag/delete-tag';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TagTable])
  ],
  providers: [
    TagService,
    CreateTagHandler,
    GetTagHandler,
    DeleteTagHandler,
  ],
  controllers: [TagController],
  exports: [CqrsModule],
})
export class TagModule { }
