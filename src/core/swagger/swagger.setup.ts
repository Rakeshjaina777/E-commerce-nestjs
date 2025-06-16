import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

export function setupSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, {
    ...swaggerConfig,
    extraModels: [],
  });

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'NestMart API Docs',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
