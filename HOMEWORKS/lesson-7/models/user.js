import { Collections, dbCollection } from "../database/index.js";
import mongodb, { ObjectId } from "mongodb";
class User {
  _id = new ObjectId();
  username;
  password;
  fullname;

  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.fullname = data.fullname;
  }

  async create() {
    const createData = {
      _id: this._id,
      username: this.username,
      password: this.password,
      fullname: this.fullname,
    };
    const insertToDb = await dbCollection[Collections["USER"]].insertOne(
      createData
    );
    return insertToDb;
  }
}

export default User;
