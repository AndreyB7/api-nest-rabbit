import {Observable, concat, from} from "rxjs";
import {mergeAll} from "rxjs/operators";
import {Inject, Injectable} from "@nestjs/common";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";
import Web3 from "web3";

@Injectable()
export class EthereumService {
  constructor(
    @Inject("client")
    private readonly client: Web3,
  ) {}

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.RMQ_Q
    },
  })
  ethClient: ClientProxy;

  public block(block: any): Observable<void> {
    return concat(
      ...block.transactions.map( (txHash, i) => {
        if (i > 0) return; // testing: get first transaction only
        return from(
          this.client.eth.getTransaction((txHash as unknown) as string).then((transaction: any) => {
            return this.ethClient.emit("TRANSACTION", transaction);
          }),
        );
      }),
    ).pipe(mergeAll());
  }
}