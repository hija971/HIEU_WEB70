import { Router } from "express";
import authRouter from "./auth.js";
import orderRouter from "./order.js";
import inventoryRouter from "./inventory.js";

const RootRouter = Router();
RootRouter.use("/auth", authRouter)
RootRouter.use("/order", orderRouter)
RootRouter.use("/inventory", inventoryRouter)

export default RootRouter;
