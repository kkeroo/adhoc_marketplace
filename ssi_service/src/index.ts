import {config} from "dotenv";
config()
import express from 'express'
// import {DidHandler} from "./handlers/didHandler";
// import {FileManager} from "./common/fileManager";

let app = express()
let port = process.env.PORT

app.use(express.json()) // express.json middleware

// const fileManager = new FileManager()
// const didHandler = new DidHandler()

app.get('/', async (req, res) => {
    // let result = await didHandler.listDids().catch((error: Error) => {
    //     res.status(400).send({message: error.message})
    // })
    res.send("OK STATUS JE OK");
})


app.listen(port, () => {
    console.log(`Veramo service listening at http://localhost:${port}`)
})