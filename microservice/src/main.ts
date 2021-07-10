import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EthereumServer } from './ethereum/server/ethereum'
import Web3 from 'web3';
import { ProviderType } from './common/providers';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const provider = app.get<Web3>(ProviderType.WEB3)

  app.connectMicroservice({
    strategy: new EthereumServer(provider),
  });

  await app.startAllMicroservicesAsync().then(() => {
    console.info(`Ethereum Listener is listening to ${process.env.ETH_NODE_RPC_WEBSOCKET_ADDR}`);
  });

  await app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Ethereum Listener health check is running on http://${process.env.HOST}:${process.env.PORT}`);
  });

}
bootstrap();