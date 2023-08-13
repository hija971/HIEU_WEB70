import { Router } from "express";
import { dbCollection } from "../database/index.js";
const RestaurantRouter = Router();

RestaurantRouter.get("/cau-1", async (req, res) => {
  const restaurants = await dbCollection.restaurants.find({}).toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-2", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ "address.zipcode": "11209" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-3", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ cuisine: "American " })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-4", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ borough: "Brooklyn" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-5", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ borough: "Manhattan" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-6", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ borough: "Manhattan", cuisine: "Chicken" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-7", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ "address.street": "Wall Street" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-8", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ $expr: { $gt: [{ $size: "$grades" }, 3] } })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-9", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ "grades.grade": "B" })
    .toArray();
  res.json(restaurants);
});

RestaurantRouter.get("/cau-10", async (req, res) => {
  const restaurants = await dbCollection.restaurants
    .find({ "grades.score": { $gt: 10 } })
    .toArray();
  res.json(restaurants);
});

export default RestaurantRouter;

//$expr operator allows using aggregation expressions within the query.
//It allows you to perform complex comparisons and logical operations.
