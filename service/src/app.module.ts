import { Module } from '@nestjs/common'
import { EthereumModule } from './ethereum/ethereum.module'
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		EthereumModule
	]
})
export class AppModule {}