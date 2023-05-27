import {config} from "dotenv";
config()
import express from 'express'
import {initORM} from "./database/rdbms.js";
import {ItemManager} from "./managers/ItemManager.js";
import {ListingManager} from "./managers/ListingManager.js";

let app = express()
let port = process.env.PORT

app.use(express.json()) // express.json middleware

const itemManager = new ItemManager()
const listingManager = new ListingManager()

app.post('/items/', async (req, res) => {
    const data = Object.assign({}, req.body)
    let result = await itemManager.createItem(data.user_uuid, data.did, data.name, data.description, data.image).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.get('/items/', async (req, res) => {
    const params = Object.assign({}, req.query)
    let result = await itemManager.getItems(params).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.get('/items/:uuid/', async (req, res) => {
    let result = await itemManager.getItem(req.params.uuid).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.post('/listings/', async (req, res) => {
    const data = Object.assign({}, req.body)
    let result = await listingManager.createListing(data.user_uuid, data.item_uuid, data.price, data.private).catch((error) => {
        console.log("BIL JE ERROR", error)
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.get('/listings/', async (req, res) => {
    const params = Object.assign({}, req.query)
    let result = await listingManager.getListings(params).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.get('/listings/:uuid/', async (req, res) => {
    let result = await listingManager.getListing(req.params.uuid).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.post('/listings/:uuid/buy/', async (req, res) => {
    let result = await listingManager.buyListing(req.params.uuid, req.body.user_uuid).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.post('/listings/:uuid/accept/', async (req, res) => {
    console.log("ACCEPTING", req.params.uuid, req.body.user_uuid)
    let result = await listingManager.confirmReceived(req.params.uuid, req.body.user_uuid).catch((error) => {
        console.log("BIL JE ERROR", error)
        res.status(400).send({message: error.message})
    })
    res.send(result);
})

app.post('/listings/:uuid/finish/', async (req, res) => {
let result = await listingManager.refundSeller(req.params.uuid, req.body.user_uuid).catch((error) => {
        res.status(400).send({message: error.message})
    })
    res.send(result);
})


initORM().then(() => {
    app.listen(port, () => {
        console.log(`Veramo service listening at http://localhost:${port}`)
    })
})
