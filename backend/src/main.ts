import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
    // logger: false,
  });
  app.useLogger(app.get(Logger));
  app.enableCors();
  await app.listen(3001);
  app.get(Logger).log('Application is up and running');
}
bootstrap();
