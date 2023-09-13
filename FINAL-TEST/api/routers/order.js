import express from 'express';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

const orderRouter = express.Router();

router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();

        const ordersWithDescription = await Promise.all(orders.map(async (order) => {

            const product = await Inventory.findOne({ sku: order.item });

            const orderWithDescription = {
                _id: order._id,
                item: order.item,
                price: order.price,
                quantity: order.quantity,
                description: product ? product.description : "Sản phẩm không có mô tả"
            };

            return orderWithDescription;
        }));

        res.json(ordersWithDescription);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng với mô tả sản phẩm." });
    }
});

export default orderRouter;