import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { CustomLoggerService } from '@lib/common/logger/logger.service';
import * as cors from 'cors';

async function bootstrap() {
  const logger = new CustomLoggerService(process.env.LOG_FILE_PATH);
  const app = await NestFactory.create(UserModule);
  app.use(
    cors({
      origin: process.env.REACT_APP_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  const port = process.env.PORT || 3000;
  logger.log(`Application is listening on ${port}`);
  await app.listen(port);
}
bootstrap();
