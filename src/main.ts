import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // cookie session middleware ->
  app.use(cookieSession({ keys: ['x-security-1867-000'] }));

  await app.listen(3000);
}
bootstrap();
