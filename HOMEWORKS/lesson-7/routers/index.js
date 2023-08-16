import { Router } from "express";
import RestaurantRouter from "./restaurant.route.js";
import AuthRouter from "./auth.route.js";
import PostRouter from "./post.route.js";
import UserRouter from "./user.route.js";
// import demoRouter from "./aggregation.js";

const RootRouterV1 = Router();

RootRouterV1.use("/restaurant", RestaurantRouter);
RootRouterV1.use("/auth", AuthRouter);
RootRouterV1.use("/post", PostRouter);
RootRouterV1.use("/user", UserRouter);

// RootRouterV1.use("/demo", demoRouter)
// RootRouterV1.use("/croissant", croissantRouter)

export default RootRouterV1;
