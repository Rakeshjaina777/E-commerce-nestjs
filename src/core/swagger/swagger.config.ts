import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestMart Backend API')
  .setDescription('Production-ready NestJS E-Commerce API with microservices')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT access token',
    },
    'access-token',
  )
  .build();
