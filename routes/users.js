const User = require('../models/User');
const bcrypt = require('bcryptjs');
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

        // Check if user exists in the database
        if (user) {
          return h.response({ message: 'User already exists' }).code(400);
        }

        // Add new user object
        user = new User({
          name,
          email,
          password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Store user in the database
        await user.save();

        const payload = {
          user: {
            id: user.id
          }
        };

        // Generate the authentication token
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
          name: Joi.string()
            .min(2)
            .max(30)
            .required(),
          email: Joi.string()
            .email()
            .required()
            .error(new Error('Please enter a valid email address')),
          password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
            .required()
            .error(
              new Error(
                'Password must 8-15 characters with at least 1 digit, 1 lowercase and 1 uppercase character'
              )
            )
        }
      }
    }
  }
];
