import { MongoClient } from "mongodb";

const Collections = {
  RESTAURANT: "restaurants",
};

const dbCollection = {};
const connectDb = async () => {
  const newClient = new MongoClient("mongodb://127.0.0.1:27017");
  await newClient.connect();
  const currentDB = newClient.db("WEB70");

  dbCollection[Collections.RESTAURANT] = currentDB.collection(
    Collections.RESTAURANT
  );
};

export { connectDb, Collections, dbCollection };
