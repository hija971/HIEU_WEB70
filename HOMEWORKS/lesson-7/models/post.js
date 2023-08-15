import { Collections, dbCollection } from "../database/index.js";
import mongodb, { ObjectId } from "mongodb";
class Post {
  _id = new ObjectId();
  userId;
  title;
  body;
  content;
  image;

  constructor(data) {
    this.userId = data.userId;
    this.title = data.title;
    this.body = data.body;
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
        image: this.image
      },
      liked: 0
    };
    const insertToDb = await dbCollection[Collections["POST"]].insertOne(
      createData
    );
    return insertToDb;
  }
}

export default User;
