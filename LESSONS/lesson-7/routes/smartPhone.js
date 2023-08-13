import { Router } from "express";
import smartPhoneController from "../controllers/smartPhone.js";

const SmartPhoneRouter = Router();

SmartPhoneRouter.post('', smartPhoneController.create)

export default SmartPhoneRouter;
