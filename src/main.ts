import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // valida en conjunto con class-validator
      forbidNonWhitelisted: true,   // properties tienen que venir como yo digo
    })
  )


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
