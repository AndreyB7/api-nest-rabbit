import {Observable} from "rxjs";
import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
// import {Block} from "web3/eth/types";

import { EthereumService } from "./wsclient.service";

@Controller()
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}
  
  @MessagePattern("BLOCK")
//   public block(block: any): Observable<object> {
//     return (block.transactions);
//   }
  public block(block: any): void {
    return this.ethereumService.rabbitMSG();//(block.transactions);
  }

}