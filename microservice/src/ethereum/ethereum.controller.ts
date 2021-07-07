import {Observable} from "rxjs";
import {Controller} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";

import {EthereumService} from "./ethereum.service";

@Controller()
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @MessagePattern("BLOCK")
  public block(data: any): Observable<void> {
    return this.ethereumService.block(data);
  }
}
