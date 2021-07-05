import { NestFactory } from '@nestjs/core';
import {EthereumServer} from "./wsclient/ws.server";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const rmqUrl = configService.get<string>("RMQ_URL");

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [rmqUrl],
  //     queue: 'first_queue',
  //   },
  // });
  app.connectMicroservice({
    strategy: new EthereumServer(),
  });

  await app.startAllMicroservicesAsync().then(() => console.info(`Message service will push to ${rmqUrl}`));

  await app.listen(process.env.PORT, process.env.HOST, () => {
    // eslint-disable-next-line no-console
    console.info(`Ethereum Listener health check is running on http://${process.env.HOST}:${process.env.PORT}`);
  });

}
bootstrap();