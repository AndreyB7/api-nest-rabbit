import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { EthereumServer } from './ethereum/server/ethereum'
import {ConfigService} from "@nestjs/config";
import Web3 from 'web3';
import { ProviderType } from './common/providers';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const provider = app.get<Web3>(ProviderType.WEB3)

  app.connectMicroservice({
    strategy: new EthereumServer(provider),
  });

  // const configService = app.get(ConfigService);
  // const rmqUrl = configService.get<string>("RMQ_URL");
  // const rmqQueue = configService.get<string>("RMQ_Q");

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [rmqUrl],
  //     queue: rmqQueue
  //   },
  // });

  await app.startAllMicroservicesAsync().then(() => {
    console.info(`Ethereum Listener is listening to ${process.env.ETH_NODE_RPC_WEBSOCKET_ADDR}`);
  });

  await app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Ethereum Listener health check is running on http://${process.env.HOST}:${process.env.PORT}`);
  });

}
bootstrap();