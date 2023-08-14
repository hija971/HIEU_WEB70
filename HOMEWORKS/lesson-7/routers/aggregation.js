import { Router } from "express";
import { dbCollection } from "../database/index.js";

const demoRouter = new Router()

demoRouter.get('/', async (req, res)=>{
    try {
        const data = await dbCollection.restaurant.aggregate([
            {
                $match: {
                    borough: "Manhattan"
                }
            }
        ]).toArray()
        return res.status(200).send(restaurant)
    } catch (error) {
        return res.status(500).send({
            error: error.error
        })
    }
})


export default demoRouter