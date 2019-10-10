const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = [
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
