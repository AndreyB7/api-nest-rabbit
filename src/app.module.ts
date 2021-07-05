import { Module } from '@nestjs/common'
import { WsModule } from './wsclient/wsclient.module'
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		WsModule
	]
})
export class AppModule {}