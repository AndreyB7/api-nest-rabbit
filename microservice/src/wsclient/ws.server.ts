import {EMPTY, Observable} from "rxjs";
import {CustomTransportStrategy, MessageHandler, Server, ClientProxy} from "@nestjs/microservices";
import Web3 from "web3";


export class EthereumServer extends Server implements CustomTransportStrategy {
  
  private readonly rabbitClientProxy: ClientProxy;

  private subscription: any;

  public listen(callback: () => void): void {
    this.listenToBlocks();
    callback();
  }

  private listenToBlocks(): void {
    const web3: Web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.SOCKET_ADDRESS));
    this.subscription = web3.eth.subscribe("syncing", (error: Error, blockHeader: any) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(blockHeader);

      web3.eth.getBlock(blockHeader.number).then(async (block: any) => {
        console.log(block);
        return this.call("BLOCK", block).then(observable => {
          observable.subscribe(console.log);
          
          try {
            this.rabbitClientProxy.emit('push-message', {
              test: "test-value"
            });
          } catch (e) {
            console.log(e);
          }


        });
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