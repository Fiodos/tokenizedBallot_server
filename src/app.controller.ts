import { ethers } from 'ethers';
import { AppService } from './app.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

export class claimTokensDto {
	address: string
	amount: string
}

export class setBallotDto {
	address: string
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('token-address')
	getTokenAddress() {
		return this.appService.getTokenAddress()
	}

	@Get('ballot-address')
	getBallotAddress() {
		return this.appService.getBallotAddress()
	}

	@Post('claim-tokens')
	claimTokens(@Body() body: claimTokensDto) {
		return this.appService.claimTokens(body.address, body.amount)
	}

	@Post('set-ballot')
	setBallot(@Body() body: setBallotDto) {
		return this.appService.setBallot(body.address)
	}
}
