import { Injectable } from "@nestjs/common";
const Web3 = require("web3");

@Injectable()
export class WSService {
    private web3 = new Web3(
        new Web3.providers.WebsocketProvider(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_ID}`)
      );

      constructor() {
        this.web3.eth.getAccounts(console.log);
      }
}
