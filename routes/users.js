const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const Joi = require('@hapi/joi');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = [
  {
    method: 'POST',
    path: '/api/users',
    handler: async (request, h) => {
      const { name, email, password } = request.payload;

      try {
        let user = await User.findOne({ email });
        if (user) {
          return h.response({ msg: 'User already exists' }).code(400);
        }

        user = new User({
          name,
          email,
          password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        return { msg: 'User registered' };
      } catch (err) {
        console.error(err.message);
        h.response('Server Error').code(500);
      }

      //   return `I should have access to ${name}, ${email} and ${password}`;
    },
    options: {
      validate: {
        payload: {
          name: Joi.string()
            .min(1)
            .max(30)
            .required(),
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
