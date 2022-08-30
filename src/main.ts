import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  ); // Força que uma excecao ocorra quando der um err, assim podemos ver melhor os dados do err no insomnia por ex
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
