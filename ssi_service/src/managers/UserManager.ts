import {UserRepository} from "../database/rdbms.js";
import {DidManager} from "./DIDManager.js";
import Web3 from "web3";
import {randomUUID} from "crypto";
import {User} from "../database/entities.js";

export class UserManager {
    web3 = new Web3(`https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`)
    constructor() {}

    async createUser(username: string){
        const user_repo = new UserRepository()
        const did_manager = new DidManager()
        const user = new User()
        const eth_account = this.web3.eth.accounts.create()
        const user_uuid = randomUUID()
        const user_did = await did_manager.importDid(user_uuid.toString(), eth_account.address.toString(), eth_account.privateKey.toString())

        user.uuid = user_uuid
        user.username = username
        user.eth_address =  eth_account.address;
        user.eth_private_key =  eth_account.privateKey;
        user.did = user_did.did

        return {uuid: await user_repo.add(user)}
    }

    async getUser(uuid: string){
        const user_repo = new UserRepository()
        return await user_repo.get(uuid)
    }

}