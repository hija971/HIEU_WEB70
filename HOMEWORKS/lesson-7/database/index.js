import { MongoClient } from "mongodb";

const Collections = {
  RESTAURANT: "restaurants",
  USER: "users",
  POST: "posts",
};

const dbCollection = {};
const connectDb = async () => {
  const newClient = new MongoClient("mongodb://127.0.0.1:27017");
  await newClient.connect();
  console.log("Connected to database");
  const currentDB = newClient.db("WEB70");

  dbCollection[Collections.RESTAURANT] = currentDB.collection(Collections.RESTAURANT);
  dbCollection[Collections.USER] = currentDB.collection(Collections.USER);
  dbCollection[Collections.POST] = currentDB.collection(Collections.POST);
};

export { connectDb, Collections, dbCollection };