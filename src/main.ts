import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import { ConfigService } from '@core/config';
import { AppModule } from '@core/app';

import { swaggerApi } from '@api/index';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService).configure();

  app.enableCors();
  app.enableShutdownHooks();
  app.setGlobalPrefix('/api/v1');
  app.use(morgan(configService.env.morganMode));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));

  SwaggerModule.setup('api', app, swaggerApi);

  await app.listen(Number(configService.env.serverPort), configService.env.serverIP);
}
bootstrap();
