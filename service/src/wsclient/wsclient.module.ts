import { Module } from '@nestjs/common'
import { EthereumService } from './wsclient.service'
import { EthereumController } from './wsclient.controller'

@Module({
	controllers: [ EthereumController ],
	providers: [ EthereumService ]
})

export class EthereumModule {}