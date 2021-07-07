import { Module } from '@nestjs/common'
import { EthereumModule } from './wsclient/wsclient.module'
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		EthereumModule
	]
})
export class AppModule {}