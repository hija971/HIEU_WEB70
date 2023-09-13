import mongoose from "mongoose";

const InventorySchema = mongoose.Schema({
    sku: String,
    description: String,
    instock: Number,
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;