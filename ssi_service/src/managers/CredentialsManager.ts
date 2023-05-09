import {agent} from "../veramo/setup.js";
import {CredentialPayload} from "@veramo/core";
import {W3CVerifiableCredential} from "@veramo/core-types/src/types/vc-data-model";

export class CredentialsManager {
    constructor() {}

    async createVerifiableCredential(credential: CredentialPayload){
        return await agent.createVerifiableCredential({
            credential,
            proofFormat: 'jwt',
        })
    }

    async verifyVerifiableCredential(credential: W3CVerifiableCredential){
        return await agent.verifyCredential({
            credential
        })
    }
}