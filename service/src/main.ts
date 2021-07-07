import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const rmqUrl = configService.get<string>("RMQ_URL");

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: process.env.RMQ_Q
    },
  });

  await app.startAllMicroservicesAsync().then(() => console.info(`Listen messages from ${rmqUrl}`));

  app.listen()

}
bootstrap();