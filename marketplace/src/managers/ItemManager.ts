import {randomUUID} from "crypto";
import {ItemRepository} from "../database/rdbms.js";
import {Item} from "../database/entities.js";
import {RepositoryOptionsT} from "../types/repositories";

export class ItemManager {

    constructor() {}

    async createItem(user_uuid: string, did: string, name: string, description: string, image: string){
        const item_repo = new ItemRepository()
        const item = new Item()
        item.uuid = randomUUID()
        item.user_uuid = user_uuid
        item.did = did
        item.name = name
        item.description = description
        item.image = image

        return {uuid: await item_repo.add(item)}
    }

    async getItem(uuid: string){
        const item_repo = new ItemRepository()
        return await item_repo.get(uuid)
    }

    async getItems(params: RepositoryOptionsT){
        const item_repo = new ItemRepository()
        return await item_repo.list(params)
    }
}