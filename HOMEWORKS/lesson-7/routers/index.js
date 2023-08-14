import { Router } from "express";
import RestaurantRouter from "./restaurant.js";
import demoRouter from "./aggregation.js";

const RootRouterV1 = Router()

RootRouterV1.use("/restaurant", RestaurantRouter)
RootRouterV1.use("/demo", demoRouter)

export default RootRouterV1