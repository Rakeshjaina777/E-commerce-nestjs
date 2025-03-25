import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes .env available everywhere
      envFilePath: '/home/rakeshjain/bazarapi/src/.env', // ✅ Load environment file
    }),
  ],
})
export class AppConfigModule {}
