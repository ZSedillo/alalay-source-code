const jwt = require('jsonwebtoken');
const userModel = require('../user/user.model');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select('-password');

    if (!req.user) return res.status(404).json({ error: 'User not found' });

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = protect;

