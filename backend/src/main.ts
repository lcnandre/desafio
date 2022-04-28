/* istanbul ignore file */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './application/modules/app.module';

(async function boostrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({limit: '50mb', extended: true}));
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: true,
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
    exposedHeaders: '*',
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());

  // OpenAPI (Swagger)
  const config = new DocumentBuilder()
    .setTitle('Desafio API')
    .setDescription('Desafio API description')
    .setVersion('1.0')
    .addTag('cards')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
})();
