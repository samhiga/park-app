const jwt = require('jsonwebtoken');
require('dotenv').config();
//heroku set environment variable  for secrets
//show environment variables section for configuration, hidden by default
const secret = process.env.SECRET || 'tempsecret';
const expiration = '2w';

module.exports = {
  //authentication route function
  authMiddleware: function ({ req }) {
    //allows token to be sent via req.body, req.query, or headers
    let token = req.query.token || req.headers.authorization || req.body.token;

    //separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    //verify token and get user data out of it
    try {
      const { data } = jw.verify(token, secret, { maxAge: expiration});
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
    },
    signToken: function ({ username, email, _id }) {
      const payload = { username, email, _id };

      return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    }
  };