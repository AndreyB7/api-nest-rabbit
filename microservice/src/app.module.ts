import "./env";

import { Module } from '@nestjs/common'
import { Logger } from "@nestjs/common";
import { EthereumModule } from './ethereum/ethereum.module'
import { ConfigModule } from "@nestjs/config";
import { web3Provider } from "./ethereum/server/ethereum.client";

@Module({
	providers: [web3Provider, Logger],
	imports: [
		ConfigModule.forRoot(),
		EthereumModule
	]
})
export class AppModule {}