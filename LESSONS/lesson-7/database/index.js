import { MongoClient } from "mongodb";

const Collections = {
  SMARTPHONE: "smartphones",
};

const dbCollection = {};
const connectDb = async () => {
  const newClient = new MongoClient("mongodb://127.0.0.1:27017");
  await newClient.connect();
  const currentTB = newClient.db("WEB70");

  dbCollection[Collections.SMARTPHONE] = currentTB.collection(
    Collections.SMARTPHONE
  );
};

export { connectDb, Collections, dbCollection };
