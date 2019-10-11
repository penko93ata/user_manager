const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = [
  {
    method: 'GET',
    path: '/api/auth',
    handler: async (request, h) => {
      const headers = request.headers;

      const token = headers['x-auth-token'];

      if (!token) {
        return h.response({ msg: 'Authorization deined' });
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.user = decoded.user;
      } catch (err) {
        return h.response('Token is not valid').code(401);
      }

      try {
        // get singed user
        const user = await User.findById(request.user.id).select('-password');
        return h.response({ user });
      } catch (err) {
        console.error(err.message);
        return h.response('Server Error').code(500);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth',
    handler: async (request, h) => {
      const { email, password } = request.payload;

      try {
        let user = await User.findOne({ email });

        if (!user) {
          return h.response({ msg: 'Invalid Credentials' }).code(400);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return h.response({ msg: 'Invalid Credentials' }).code(400);
        }

        const payload = {
          user: {
            id: user.id
          }
        };

        const token = jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 360000
        });
        return { token };
      } catch (err) {
        console.error(err.message);
        return h.response('Server Error').code(500);
      }
    },
    options: {
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
            .required()
        }
      }
    }
  }
];
