import {EMPTY, Observable} from "rxjs";
import {CustomTransportStrategy, MessageHandler, Server} from "@nestjs/microservices";
import Web3 from "web3";
import {ClientProxy} from "@nestjs/microservices";
// import {Block, BlockHeader} from "web3/eth/types";


export class WsService {
  
  private block(block) {
    console.log(block);
  }
}