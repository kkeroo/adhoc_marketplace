import {config} from "dotenv";
config()
import express from 'express'
import {DidManager} from "./managers/DIDManager.js";
import {CredentialsManager} from "./managers/CredentialsManager.js";
import {UserManager} from "./managers/UserManager.js";
import {initORM} from "./database/rdbms.js";

let app = express()
let port = process.env.PORT

app.use(express.json()) // express.json middleware

// const fileManager = new FileManager()
const didManager = new DidManager()
const credentialManager = new CredentialsManager()
const user_manager = new UserManager()

// CREATE USER
app.post('/users/', async (req, res) => {
    const data = Object.assign({}, req.body)
    let result = await user_manager.createUser(data.username, data.first_name, data.last_name).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// GET USER
app.get('/users/:uuid/', async (req, res) => {
    let result = await user_manager.getUser(req.params.uuid).catch((error: Error) => {
        console.log("BIL JE ERROR")
        console.log(error)
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// GET DID LIST
app.get('/did/', async (req, res) => {
    let result = await didManager.getDidList().catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// CREATE DID
app.post('/did/', async (req, res) => {
    let result = await didManager.createDid(req.body.alias).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// RESOLVE DID
app.get('/did/:did/', async (req, res) => {
    let result = await didManager.resolveDid(req.params.did).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// DELETE DID
app.delete('/did/:did/', async (req, res) => {
    let result = await didManager.deleteDid(req.params.did).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// CREATE VERIFIABLE CREDENTIAL
app.post('/vc/', async (req, res) => {
    const data = Object.assign({}, req.body)
    let result = await credentialManager.createVerifiableCredential(data).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

// VERIFY VERIFIABLE CREDENTIAL
app.post('/vc/verify/', async (req, res) => {
    const data = Object.assign({}, req.body)
    let result = await credentialManager.verifyVerifiableCredential(data.verifiable_credential).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

initORM().then(() => {
    app.listen(port, () => {
        console.log(`Veramo service listening at http://localhost:${port}`)
    })
})
