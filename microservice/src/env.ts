import {config} from "dotenv";


config({
  path: `.env`,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test" | "staging";

      // SERVER
      HOST: string;
      PORT: string;

      // RMQ
      RMQ_URL: string;
      RMQ_Q: string;

      // ETH
      ETH_NODE_RPC_WEBSOCKET_ADDR: string;
      ETH_NETWORK: "mainnet" | "rinkeby" | "regtest";
    }
  }
}
