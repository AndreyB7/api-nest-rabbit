import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const rmqUrl = configService.get<string>("RMQ_URL");
  const rmqQueue = configService.get<string>("RMQ_Q");

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: rmqQueue
    },
  });

  await app.startAllMicroservicesAsync().then(() => console.info(`Listen messages from ${rmqUrl}`));

  app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Rabbit Etherium Listener is running on http://${process.env.HOST}:${process.env.PORT}`);
  });

}
bootstrap();