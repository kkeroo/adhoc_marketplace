import {Column, DataSource, Entity, In, Not, PrimaryColumn, Raw} from "typeorm";
import {IRepository, PrimaryKeyT, RepositoryOptionsT} from "../types/repositories";

export let db: DataSource

export const initORM = async () => {
    db = new DataSource({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRESQL_DB,
        logging: false,
        entities: [
            User
        ],
        synchronize: false,
        cache: false
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

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    uuid: string

    @Column()
    username: string

    @Column()
    eth_address: string

    @Column()
    eth_private_key: string

    @Column()
    did: string
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
        return await db.manager.findOne<User>(User, { uuid })
    }

}
