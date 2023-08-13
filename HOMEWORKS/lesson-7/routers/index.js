import { Router } from "express";
import RestaurantRouter from "./restaurant.js";

const RootRouterV1 = Router()

RootRouterV1.use("/restaurant", RestaurantRouter)

export default RootRouterV1