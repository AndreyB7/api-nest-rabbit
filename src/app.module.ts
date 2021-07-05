import { Module } from '@nestjs/common'
import { WsModule } from './wsclient/wsclient.module'

@Module({
	imports: [ WsModule ]
})
export class AppModule {}