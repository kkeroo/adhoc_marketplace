import {Column, Entity, PrimaryColumn} from "typeorm";

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


@Entity({ name: 'listings' })
export class Listing {
    @PrimaryColumn()
    uuid: string

    @Column()
    user_uuid: string

    @Column()
    item: string

    @Column()
    price: number

    @Column()
    contract_address: string

    @Column()
    contract_abi: string

    @Column()
    private: boolean
}

@Entity({ name: 'items' })
export class Item {
    @PrimaryColumn()
    uuid: string

    @Column()
    user_uuid: string

    @Column()
    did: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string
}
