const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function async(req, res, next) {
  // «« Get token from header
  const token = req.header('x-auth-token');
  // «« Check if there's no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // «« 401 = no authorization
  }
  // «« Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); // «« this will decode the token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); // «« Will run if the token is not valid
  }
};
