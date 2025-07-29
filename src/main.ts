import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';


import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { useContainer } from 'class-validator';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { TransformInterceptor } from './core/transform.interceptor.js';
import { AppModule } from './app.module.js';



import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function bootstrap() {

  await mongoose.connect(process.env.MONGODB_URI);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  });


  app.enableCors({
    origin: ['http://localhost:4000'], // Cho phép FE
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));
  // const adminJS = new AdminJS({
  //   // ...
  // })
  // adminJS.watch()


  await app.listen(configService.get('PORT'));
}
bootstrap();
