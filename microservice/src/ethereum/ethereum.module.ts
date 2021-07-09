import { Module } from '@nestjs/common'
import { EthereumService } from './ethereum.service'
import { EthereumController } from './ethereum.controller'
import client from "./server/ethereum.client";

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