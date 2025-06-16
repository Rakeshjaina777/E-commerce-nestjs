import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthTokenMiddleware } from './common/middleware/auth-token.middleware';

@Module({
  imports: [
    /* modules */
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthTokenMiddleware).forRoutes('*');
  }
}
