import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Authenticate from '../middlewares/authentication.js';

const authRouter = express.Router();

router.post("/login",Authenticate, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Tên đăng nhập không tồn tại." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mật khẩu không chính xác." });
        }

        const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

        res.status(200).json({ message: "Đăng nhập thành công.", token });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng nhập." });
    }
});;

export default authRouter;