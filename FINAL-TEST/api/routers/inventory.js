import express from "express";
import Inventory from "../models/Inventory.js";

const inventoryRouter = express.Router();

router.get('/inventory', async (req, res) => {
  try {
    const { lowQuantity } = req.query;
    let products;

    if (lowQuantity === 'true') {
      products = await Inventory.find({ instock: { $lte: 100 } });
    } else {
      products = await Inventory.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm trong kho hàng.' });
  }
});

export default inventoryRouter;