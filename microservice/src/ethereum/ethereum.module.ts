import { Module } from '@nestjs/common'
import { EthereumService } from './ethereum.service'
import { EthereumController } from './ethereum.controller'
import client from "./server/ws.ethereum";

@Module({
	providers: [ 
		{
			provide: "client",
			useValue: client,
		},
		EthereumService ],
	controllers: [EthereumController],
	exports: [ EthereumService ],
})

export class EthereumModule {}