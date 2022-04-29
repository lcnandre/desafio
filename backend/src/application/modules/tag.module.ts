/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagTable } from '../../io/database/tag.table';
import { TagService } from '../services/tag.service';
import { TagController } from '../../io/controllers/tag/tag.controller';
import { CreateTagHandler } from '../../domain/use-cases/tag/create-tag';
import { GetTagHandler } from '../../domain/use-cases/tag/find-tag';
import { DeleteTagHandler } from '../../domain/use-cases/tag/delete-tag';
import { UpdateTagHandler } from '../../domain/use-cases/tag/update-tag';

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
    UpdateTagHandler,
  ],
  controllers: [TagController],
  exports: [CqrsModule],
})
export class TagModule { }
