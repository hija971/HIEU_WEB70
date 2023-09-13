import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    item: String,
    price: Number,
    quantity: Number,
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;