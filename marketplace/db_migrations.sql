
create table if not exists "users"
(
    uuid                       text default uuid_generate_v4() not null
        constraint users_pk
            primary key,
    username                   text,
    eth_address                text,
    eth_private_key            text,
    did                        text
);

create table if not exists "items"
(
    uuid                       text default uuid_generate_v4() not null
                                constraint items_pk primary key,
    user_uuid                   text,
    did                         text,
    name                        text,
    description                 text,
    image                       text
);

create table if not exists "listings"
(
    uuid                       text default uuid_generate_v4() not null
                                constraint listings_pk primary key,
    item                        text,
    price                       integer,
    contract                    text,
    private                     boolean
);