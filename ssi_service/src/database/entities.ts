import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    uuid: string

    @Column()
    username: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    eth_address: string

    @Column()
    eth_private_key: string

    @Column()
    did: string
}