import {config} from "dotenv";
config()
import express from 'express'
import {DidManager} from "./managers/DIDManager.js";
import {CredentialsManager} from "./managers/CredentialsManager.js";
// import {FileManager} from "./common/fileManager";

let app = express()
let port = process.env.PORT

app.use(express.json()) // express.json middleware

// const fileManager = new FileManager()
const didManager = new DidManager()
const credentialManager = new CredentialsManager()

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
    let result = await credentialManager.createVerifiableCredential(req.body).catch((error: Error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})


app.listen(port, () => {
    console.log(`Veramo service listening at http://localhost:${port}`)
})