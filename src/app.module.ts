import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
// import { TestModule } from './test/test.module';
import { UsersModule } from './users/users.module';
import 'dotenv/config'
import { AppConfigModule } from './config/config.module';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule,AppConfigModule], // ✅ Fixed
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
