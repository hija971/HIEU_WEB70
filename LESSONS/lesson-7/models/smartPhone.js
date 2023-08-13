import { Collections, dbCollection } from "../database/index.js";
import mongodb, { ObjectId } from "mongodb";
class SmartPhone {
  // attribute
  phoneName;
  ver;
  type;
  PIN;
  date;
  _id = new ObjectId();
  // constructor
  constructor(data) {
    this.phoneName = data.phoneName;
    this.ver = data.ver;
    this.type = data.type;
    this.PIN = data.PIN;
    this.date = data.date;
  }
  // methods
  async create() {
    const dataCreate = {
      phoneName: this.phoneName,
      ver: this.ver,
      type: this.type,
      PIN: this.PIN,
      date: this.date,
      _id: this._id
    };
    const insertDb = await dbCollection[Collections["SMARTPHONE"]].insertOne(
      dataCreate
    );
    return insertDb;
  }
}

export default SmartPhone;
