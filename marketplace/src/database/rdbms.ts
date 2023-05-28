import {createQueryBuilder, DataSource, In, Not, Raw} from "typeorm";
import {IRepository, PrimaryKeyT, RepositoryOptionsT} from "../types/repositories.js";
import {Item, User, Listing} from "./entities.js";

export let db: DataSource

export const initORM = async () => {
    db = new DataSource({
        type: "postgres",
        host: process.env.POSTGRESQL_HOST,
        port: 5432,
        username: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PWD,
        database: process.env.POSTGRESQL_DB,
        logging: false,
        entities: [User, Item, Listing],
        synchronize: false,
        cache: false
    })
    db.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}

export const parseOptions: (options: RepositoryOptionsT) => RepositoryOptionsT = (options) => {
    Object.keys(options).forEach((key) => {
        if (key.includes('__')) {
            const [field, operator] = key.split('__')
            switch (operator) {
                // In
                case 'in':
                    options[field] = In(options[key])
                    delete options[key]
                    break
                // Case Insensitive
                case 'ci':
                    options[field] = Raw((alias) => `LOWER(${alias}) = LOWER(:value)`, { value: options[key] })
                    delete options[key]
                    break
                // Not Equal
                case 'neq':
                    options[field] = Not(options[key])
                    delete options[key]
                    break
                // Array Includes
                case 'includes':
                    options[field] = Raw((alias) => `EXISTS(SELECT FROM UNNEST(${alias}) t WHERE t LIKE :value)`, {
                        value: `%${options[key]}%`,
                    })
                    delete options[key]
                    break
            }
        }
    })
    return options
}

export class UserRepository implements IRepository {

    async list(options: RepositoryOptionsT = {}) {
        options = parseOptions(options)
        return await db.manager.find<User>(User, options)
    }

    async first(options: RepositoryOptionsT = {}): Promise<User | null> {
        options = parseOptions(options)
        return await db.manager.findOne<User>(User, options)
    }

    async exists(options: RepositoryOptionsT = {}): Promise<boolean> {
        options = parseOptions(options)
        return await db.manager.count(User, options) > 0
    }

    async add(model: User, options: RepositoryOptionsT = {}): Promise<PrimaryKeyT> {
        const u = await db.manager.insert<User>(User, model)
        return u.identifiers[0].uuid
    }

    async update(uuid: string, model: User, options: RepositoryOptionsT = {}): Promise<User> {
        const u = await db.manager.update<User>(User, uuid, model)
        return u.raw
    }

    async delete(uuid: string): Promise<void> {
        await db.manager.delete<User>(User, uuid)
    }

    async get(uuid: PrimaryKeyT): Promise<User | null> {
        // @ts-ignore
        return await db.manager.findOne<User>(User, {where: parseOptions({uuid})})
    }

}


export class ItemRepository implements IRepository {

    async list(options: RepositoryOptionsT = {}) {
        options = parseOptions(options)
        return await db.manager.find<Item>(Item, {where: options})
    }

    async first(options: RepositoryOptionsT = {}){
        options = parseOptions(options)
        return await db.manager.findOne<Item>(Item, options)
    }

    async exists(options: RepositoryOptionsT = {}){
        options = parseOptions(options)
        return await db.manager.count(Item, options) > 0
    }

    async add(model: Item, options: RepositoryOptionsT = {}){
        const i = await db.manager.insert<Item>(Item, model)
        return i.identifiers[0].uuid
    }

    async update(uuid: string, model: Item, options: RepositoryOptionsT = {}){
        const i = await db.manager.update<Item>(Item, uuid, model)
        return i.raw
    }

    async delete(uuid: string){
        await db.manager.delete<Item>(Item, uuid)
    }

    async get(uuid: PrimaryKeyT){
        // @ts-ignore
        return await db.manager.findOne<Item>(Item, {where: parseOptions({uuid})})
    }
}

export class ListingRepository implements IRepository {

        async list(options: RepositoryOptionsT = {}) {
            // Select a user and all their watchers
            // const query = createQueryBuilder('listings', 'l')
            //     .innerJoinAndSelect('l.item', 'i'); // 'w.userId = u.id' may be omitted
            // return await query.getMany();
            options = parseOptions(options)
            // return await db.manager.find<Listing>(Listing, {where: options})
            return await db.getRepository(Listing).find({where: options, relations: {item: true}})
        }

        async first(options: RepositoryOptionsT = {}){
            options = parseOptions(options)
            return await db.manager.findOne<Listing>(Listing, options)
        }

        async exists(options: RepositoryOptionsT = {}){
            options = parseOptions(options)
            return await db.manager.count(Listing, options) > 0
        }

        async add(model: Listing, options: RepositoryOptionsT = {}){
            const i = await db.manager.insert<Listing>(Listing, model)
            return i.identifiers[0].uuid
        }

        async update(uuid: string, model: Listing, options: RepositoryOptionsT = {}){
            const i = await db.manager.update<Listing>(Listing, uuid, model)
            return i.raw
        }

        async delete(uuid: string){
            await db.manager.delete<Listing>(Listing, uuid)
        }

        async get(uuid: PrimaryKeyT){
            return await db.getRepository(Listing).findOne({where: parseOptions({uuid}), relations: {item: true}})
        }
}


