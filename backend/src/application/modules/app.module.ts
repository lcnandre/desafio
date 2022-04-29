/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '../../io/controllers/app.controller';
import { CardModule } from './card.module';
import { TagModule } from './tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    TagModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
