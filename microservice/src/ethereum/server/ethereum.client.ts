import { Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProviderType } from "src/common/providers";
//import Web3 from 'web3';
const Web3 = require('web3');

export const web3Provider = {
  provide: ProviderType.WEB3,
  inject: [ConfigService, Logger],
  useFactory: (configService: ConfigService, loggerService: LoggerService) => {

    const wsUrl = configService.get<string>("ETH_NODE_RPC_WEBSOCKET_ADDR", "");

    const provider = new Web3.providers.WebsocketProvider(wsUrl);

    const web3 = new Web3(provider);

    web3.eth.net
      .isListening()
      .then(() => {
        loggerService.log(`[Web3][Websocket] connected: ${wsUrl}.`, ProviderType.WEB3);
      })
      .catch(e => {
        loggerService.error (e.message, e.stack, ProviderType.WEB3);
        web3.setProvider(provider);
      });

      return web3;

  },
};