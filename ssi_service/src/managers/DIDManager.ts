import {agent} from "../veramo/setup.js";

export class DidManager {
    constructor() {}

    async createDid(alias?: string){
        return await agent.didManagerCreate({
            alias: alias,
            provider: 'did:ethr:goerli',
            kms: 'local'
        })
    }

    async getDid(alias: string){
        return await agent.didManagerGetByAlias({ alias: alias })
    }

    async getDidList(){
        return await agent.didManagerFind({
            provider: 'did:ethr:goerli'
        })
    }

    async resolveDid(did: string){
        return await agent.resolveDid({
            didUrl: did
        })
    }

    async deleteDid(did: string){
        return await agent.didManagerDelete({
            did: did
        })
    }

    async importDid(uuid: string, address: string, privateKey: string){
        return await agent.didManagerImport({
            alias: uuid,
            did: `did:ethr:goerli:${address}`,
            provider: 'did:ethr:goerli',
            keys: [
                {
                    kms: 'local',
                    privateKeyHex: privateKey.replace('0x', ''),
                    type: 'Secp256k1',
                },
            ],
        })
    }

}