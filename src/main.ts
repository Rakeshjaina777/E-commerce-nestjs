import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './core/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Enables automatic conversion (e.g., "1" → number)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger setup
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
