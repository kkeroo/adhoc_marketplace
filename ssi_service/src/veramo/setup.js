// Core interfaces
import { createAgent } from '@veramo/core';
// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager';
// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
// Core key manager plugin
import { KeyManager } from '@veramo/key-manager';
// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store';
// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm';
// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';
// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
// This will be the secret key for the KMS
const KMS_SECRET_KEY = 'a95df40ba38a4e590ba0dd916df917f0de4afceddaf9833c1a6c8ac9c00dfac9';
const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
}).initialize();
export const agent = createAgent({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:ethr:goerli',
            providers: {
                'did:ethr:goerli': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'goerli',
                    rpcUrl: 'https://goerli.infura.io/v3/' + INFURA_PROJECT_ID,
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
            }),
        }),
    ],
});
