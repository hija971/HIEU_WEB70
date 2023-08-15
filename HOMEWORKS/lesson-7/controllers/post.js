import Post from "../models/user.js"
import { resClientData } from "../utils/index.js"

const postController = {
    create: async (req, res) => {
        try {
            const data = req.body
            const post = new Post(data)
            const createPost = await post.create()
            resClientData(res, 201, createPost, "Post added")
        } catch (error) {
            resClientData(res, 403, null, error.message)          
        }
    }
}

export default postController