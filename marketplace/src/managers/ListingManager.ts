import Web3 from "web3";
import * as fs from "fs";
// const solc = require('solc');
// @ts-ignore
import solc from "solc";
import {Listing} from "../database/entities.js";
import {randomUUID} from "crypto";
import {ListingRepository, UserRepository} from "../database/rdbms.js";
import {RepositoryOptionsT} from "../types/repositories.js";

export class ListingManager {
    web3 = new Web3(`https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)
    constructor() {}

    async createListing(user_uuid: string, item_uuid: string, price: number, _private: boolean){
        // Load the contract source code
        const sourceCode = fs.readFileSync('/code/contracts/Listing.sol', 'utf-8');
        // Compile the source code and retrieve the ABI and Bytecode
        const { abi, bytecode } = this.compileContract(sourceCode, 'Listing');
        // Store the ABI and Bytecode into a JSON file
        // const artifact = JSON.stringify({ abi, bytecode }, null, 2);
        // fs.writeFileSync('Demo.json', artifact);

        const user_repo = new UserRepository()
        const user = await user_repo.get(user_uuid)

        console.log('USER', user)
        console.log('USER', user?.eth_private_key)

        // Creating a signing account from a private key
        const signer = this.web3.eth.accounts.privateKeyToAccount(
            // @ts-ignore
            user.eth_private_key
        );
        this.web3.eth.accounts.wallet.add(signer);

        // Using the signing account to deploy the contract
        const contract = new this.web3.eth.Contract(abi);
        const last_block = await this.web3.eth.getBlock("latest")
        contract.options.data = bytecode;
        const deployTx = contract.deploy({data: bytecode});
        const deployedContract = await deployTx
            .send({
                from: signer.address,
                // gas: this.web3.utils.toWei("0.00250", "ether"),
                gas: last_block.gasLimit,
                value: price * 2    // 2x the price of the item
            })
            .once("transactionHash", (txhash: string) => {
                console.log(`Mining deployment transaction ...`);
                console.log(`https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`);
            });

        // The contract is now deployed on chain!
        console.log(`Contract deployed at ${deployedContract.options.address}`);

        const listing = new Listing()
        listing.uuid = randomUUID()
        listing.user_uuid = user_uuid
        listing.item = item_uuid
        listing.price = price
        listing.contract_address = deployedContract.options.address
        listing.contract_abi = JSON.stringify(abi)
        listing.private = _private

        const listing_repo = new ListingRepository()

        return {uuid: await listing_repo.add(listing)}

    }

    compileContract(sourceCode: string, contractName: string) {
        // Create the Solidity Compiler Standard Input and Output JSON
        const input = {
            language: 'Solidity',
            sources: { main: { content: sourceCode } },
            settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
        };
        // Parse the compiler output to retrieve the ABI and Bytecode
        const output = solc.compile(JSON.stringify(input));
        const artifact = JSON.parse(output).contracts.main[contractName];
        return {
            abi: artifact.abi,
            bytecode: artifact.evm.bytecode.object,
        };
    }

    async getListing(uuid: string){
        const listing_repo = new ListingRepository()
        return await listing_repo.get(uuid)
    }

    async getListings(params: RepositoryOptionsT){
        const listing_repo = new ListingRepository()
        return await listing_repo.list(params)
    }

    async buyListing(uuid: string, user_uuid: string){
        const listing_repo = new ListingRepository()
        const listing = await listing_repo.get(uuid)
        const user_repo = new UserRepository()
        const user = await user_repo.get(user_uuid)


        // Creating a signing account from a private key
        const signer = this.web3.eth.accounts.privateKeyToAccount(
            // @ts-ignore
            user.eth_private_key
        );
        this.web3.eth.accounts.wallet.add(signer);

        // @ts-ignore
        const contract = new this.web3.eth.Contract(JSON.parse(listing?.contract_abi), listing?.contract_address);
        const last_block = await this.web3.eth.getBlock("latest")
        const buyTx = contract.methods.confirmPurchase()
        // const buyTxData = buyTx.encodeABI()

        const receipt = await buyTx
            .send({
                from: signer.address,
                gas: last_block.gasLimit,
                // data: buyTx.encodeABI(),
                // @ts-ignore
                value: listing?.price * 2    // 2x the price of the item
            })
            .once("transactionHash", (txhash: string) => {
                console.log(`Mining transaction ...`);
                console.log(`https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`);
            });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
        console.log('RECEIPT', receipt)

        return {receipt: receipt}
    }

    async confirmReceived(uuid: string, user_uuid: string){
        const listing_repo = new ListingRepository()
        const listing = await listing_repo.get(uuid)
        const user_repo = new UserRepository()
        const user = await user_repo.get(user_uuid)


        // Creating a signing account from a private key
        const signer = this.web3.eth.accounts.privateKeyToAccount(
            // @ts-ignore
            user.eth_private_key
        );
        this.web3.eth.accounts.wallet.add(signer);

        // @ts-ignore
        const contract = new this.web3.eth.Contract(JSON.parse(listing?.contract_abi), listing?.contract_address);
        const last_block = await this.web3.eth.getBlock("latest")
        const buyTx = contract.methods.confirmReceived()

        const receipt = await buyTx
            .send({
                from: signer.address,
                gas: last_block.gasLimit
            })
            .once("transactionHash", (txhash: string) => {
                console.log(`Mining transaction ...`);
                console.log(`https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`);
            });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
        console.log('RECEIPT', receipt)

        return {receipt: receipt}
    }

    async refundSeller(uuid: string, user_uuid: string){
        const listing_repo = new ListingRepository()
        const listing = await listing_repo.get(uuid)
        const user_repo = new UserRepository()
        const user = await user_repo.get(user_uuid)


        // Creating a signing account from a private key
        const signer = this.web3.eth.accounts.privateKeyToAccount(
            // @ts-ignore
            user.eth_private_key
        );
        this.web3.eth.accounts.wallet.add(signer);

        // @ts-ignore
        const contract = new this.web3.eth.Contract(JSON.parse(listing?.contract_abi), listing?.contract_address);
        const last_block = await this.web3.eth.getBlock("latest")
        const buyTx = contract.methods.refundSeller()

        const receipt = await buyTx
            .send({
                from: signer.address,
                gas: last_block.gasLimit,
            })
            .once("transactionHash", (txhash: string) => {
                console.log(`Mining transaction ...`);
                console.log(`https://${process.env.ETHEREUM_NETWORK}.etherscan.io/tx/${txhash}`);
            });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
        console.log('RECEIPT', receipt)

        return {receipt: receipt}
    }

}