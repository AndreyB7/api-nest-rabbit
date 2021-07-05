import { Module } from '@nestjs/common'
import { WSService } from './wsclient'

@Module({
	providers: [ WSService ]
})

export class WsModule {}