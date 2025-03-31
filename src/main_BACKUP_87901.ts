import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'
import { AuthenticationGuard } from './utility/guard/autnenication.guard';
import { AuthorizationGuard } from './utility/guard/authorization.guard';
// ✅ Load .env filemain

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Enable CORS (for frontend API calls)
  app.enableCors();
  // ✅ Print environment variables only in development mode
  if (process.env.NODE_ENV !== 'production') {
    // console.log(
    //   '-----------------------Loaded Environment Variables:',
    //   process.env,
    // );
    // console.log(
    //   'ACCESS_TOKEN_SECRET_KEY:',
    //   process.env.ACCESS_TOKEN_SECRET,
    // );
  }
app.useGlobalGuards(new AuthenticationGuard())
  const PORT =  7501;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
