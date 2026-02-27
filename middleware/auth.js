const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // 1️⃣ التأكد إن فيه Authorization Header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    // 2️⃣ التأكد إن الفورمات صحيح (Bearer token)
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Unauthorized: Invalid token format' });
    }

    // 3️⃣ استخراج التوكن
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Unauthorized: Token missing' });
    }

    // 4️⃣ التأكد إن JWT_SECRET موجود
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in .env');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    // 5️⃣ فك التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 6️⃣ البحث عن المستخدم
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized: User not found' });
    }

    // 7️⃣ تخزين المستخدم في الريكوست
    req.user = user;

    next();

  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ msg: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = auth;