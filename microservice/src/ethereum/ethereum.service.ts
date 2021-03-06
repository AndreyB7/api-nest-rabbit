import {Observable, concat, from} from "rxjs";
import {mergeAll} from "rxjs/operators";
import {Inject, Injectable} from "@nestjs/common";
import {Client, ClientProxy, Transport} from "@nestjs/microservices";
import Web3 from "web3";
import { BlockTransactionObject, Transaction } from 'web3-eth';
import { ProviderType } from "src/common/providers";
@Injectable()
export class EthereumService {
  constructor(
    @Inject(ProviderType.WEB3)
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

  public block(block: BlockTransactionObject): Observable<void> {
    return concat(
      ...block.transactions.map( (txHash, i: number) => {
        if (i > 0) return; // testing: get first transaction only
        return from(
          this.client.eth.getTransaction((txHash as unknown) as string).then((transaction: Transaction) => {
            return this.ethClient.emit("TRANSACTION", transaction);
          }),
        );
      }),
    ).pipe(mergeAll());
  }
}