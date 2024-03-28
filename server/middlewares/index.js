const { expressjwt } = require('express-jwt');

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});
