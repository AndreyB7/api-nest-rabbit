import { Module } from '@nestjs/common'
import { EthereumService } from './ethereum.service'
import { EthereumController } from './ethereum.controller'
import { Logger } from "@nestjs/common";
import { web3Provider } from './server/ethereum.client';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	providers: [
		web3Provider,
		Logger,
		EthereumService ],
	controllers: [EthereumController],
	exports: [ EthereumService ],
})

export class EthereumModule {}