import { Collections, dbCollection } from "../database/index.js";
import { ObjectId } from "mongodb";
class Post {
  _id = new ObjectId();
  userId;
  title;
  body;
  content;
  image;
  liked;

  constructor(data) {
    this.userId = data.userId;
    this.title = data.title;
    this.content = data.content;
    this.image = data.image;
  }

  async create() {
    const createData = {
      _id: this._id,
      userId: this.userId,
      title: this.title,
      body: {
        content: this.content,
        image: this.image,
      },
      liked: 0,
    };
    const insertToDb = await dbCollection[Collections["POST"]].insertOne(
      createData
    );
    return insertToDb;
  }
}

export default Post;
