import Post from "../models/post.model.js";
import { ObjectId } from "mongodb";
import { dbCollection } from "../database/index.js";
import { resClientData } from "../utils/index.js";

const postController = {
  create: async (req, res) => {
    try {
      const { userId } = req.params;
      const { title, content, image } = req.body;
      const data = {
        userId: userId,
        title: title,
        content: content,
        image: image,
      };
      
      const post = new Post(data);
      const user = await dbCollection.users.findOne({
        _id: new ObjectId(userId),
      });
      if (!user) {
        resClientData(res, 404, null, "User not found");
        return;
      }
      const createPost = await post.create();
      resClientData(res, 201, createPost, "Post added");
    } catch (error) {
      resClientData(res, 403, null, error.message);
    }
  },
};

export default postController;
