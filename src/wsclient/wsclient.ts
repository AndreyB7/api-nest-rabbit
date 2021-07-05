import { Injectable } from "@nestjs/common";
const Web3 = require("web3");

@Injectable()
export class WSService {
    private web3 = new Web3(
        new Web3.providers.WebsocketProvider(process.env.SOCKET_ADDRESS)
      );

      constructor() {
        this.web3.eth.getAccounts(console.log);
      }
}
