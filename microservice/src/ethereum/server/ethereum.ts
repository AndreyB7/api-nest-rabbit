import {Observable, EMPTY} from "rxjs";
import {CustomTransportStrategy, MessageHandler, Server} from "@nestjs/microservices";
import ethereum from "./ethereum.client";

export class EthereumServer extends Server implements CustomTransportStrategy {
  private subscription: any;

  public listen(callback: () => void): void {
    this.listenToBlocks();
    callback();
  }

  public client = ethereum.eth;

  private listenToBlocks(): void {
    this.subscription = ethereum.eth.subscribe("newBlockHeaders", (error: Error, blockHeader: any) => {
      if (error) {
        console.error(error);
        return;
      }

      ethereum.eth.getBlock(blockHeader.number).then(async (block: any) => {
        return this.call("BLOCK", block);
      });
    });
  }

  private call(pattern: string, data: any): Promise<Observable<any>> {
    const handler: MessageHandler | undefined = this.messageHandlers.get(pattern);

    if (!handler) {
      return Promise.resolve(EMPTY);
    }

    return handler(data);
  }

  public close(): void {
    this.subscription.unsubscribe();
  }
}
