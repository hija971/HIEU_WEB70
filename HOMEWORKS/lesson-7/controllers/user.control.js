import User from "../models/user.model.js"
import { resClientData } from "../utils/index.js"

const userController = {
    create: async (req, res) => {
        try {
            const data = req.body
            const user = new User(data)
            const createUser = await user.create()
            resClientData(res, 201, createUser, "User registered successfully")
        } catch (error) {
            resClientData(res, 403, null, error.message)          
        }
    }
}

export default userController