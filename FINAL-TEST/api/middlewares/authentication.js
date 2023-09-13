import jwt from 'jsonwebtoken';

const Authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Bạn cần đăng nhập để truy cập tài nguyên này." });
    }

    try {
        const decodedToken = jwt.verify(token, "your-secret-key");
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token không hợp lệ." });
    }
};

export default Authenticate;