import { ethers } from 'ethers'
import { ConfigService } from '@nestjs/config'
import * as erc20Json from './assets/MyERC20.json'
import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {

	signer: any
	wallet: ethers.Wallet
	tokenContract: ethers.Contract
	provider: ethers.providers.Provider
	tokenAddress: string = '0xA1D703118fe5b3C2dC00835d6169e448B7e8183C'
	ballotAddress: string

	constructor(private configService: ConfigService) {
		this.provider = ethers.getDefaultProvider('goerli')
		this.ballotAddress = ''
	}

	getTokenAddress() {
		return { result: this.tokenAddress }
	}

	getBallotAddress() {
		return { result: this.ballotAddress }
	}

	async claimTokens(address: string, amount: string) {
		this.wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
		this.signer = this.wallet.connect(this.provider)
		this.tokenContract = new ethers.Contract(this.tokenAddress, erc20Json.abi, this.signer)
		await this.tokenContract['mint'](address, ethers.utils.parseEther(amount))
	}

	setBallot(address: string) {
		this.ballotAddress = address
	}
}
