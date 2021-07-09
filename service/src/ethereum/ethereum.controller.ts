// import {Observable} from "rxjs";
import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";

import { EthereumService } from "./ethereum.service";

@Controller()
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}
  
  @MessagePattern("TRANSACTION")
  public block(block: any): void {
    return this.ethereumService.block(block);
  }

}