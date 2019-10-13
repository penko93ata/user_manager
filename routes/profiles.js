const Joi = require('joi');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = [
  {
    method: 'POST',
    path: '/api/profile',
    handler: async (request, h) => {
      const headers = request.headers;

      const token = headers['x-auth-token'];

      if (!token) {
        return h.response({ msg: 'Authorization deined' }.code(401));
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.user = decoded.user;
      } catch (err) {
        return h.response('Token is not valid').code(401);
      }

      const { name, email, description, phone } = request.payload;

      try {
        const newProfile = new Profile({
          name,
          email,
          description,
          phone
        });

        const savedProfile = await newProfile.save();
        return h.response(savedProfile);
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
            .required(),
          description: Joi.string(),
          phone: Joi.string()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/profile',
    handler: async (request, h) => {
      const headers = request.headers;

      const token = headers['x-auth-token'];

      if (!token) {
        return h.response({ msg: 'Authorization deined' }).code(401);
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.user = decoded.user;
      } catch (err) {
        return h.response('Token is not valid').code(401);
      }

      try {
        const profiles = await Profile.find({});
        return h.response(profiles);
      } catch (err) {
        console.error(err.message);
        return h.response('Server Error').code(500);
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/profile/{id}',
    handler: async (request, h) => {
      const headers = request.headers;

      const token = headers['x-auth-token'];

      if (!token) {
        return h.response({ msg: 'Authorization deined' }.code(401));
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.user = decoded.user;
      } catch (err) {
        return h.response('Token is not valid').code(401);
      }

      try {
        let profile = await Profile.findById(request.params.id);

        if (!profile) return h.response({ msg: 'Contact not found' }).code(404);

        await Profile.findByIdAndRemove(request.params.id);
        return h.response({ msg: 'Contact removed' });
      } catch (err) {
        console.error(err.message);
        return h.response('Server Error').code(500);
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/profile/{id}',
    handler: async (request, h) => {
      const headers = request.headers;

      const token = headers['x-auth-token'];

      if (!token) {
        return h.response({ msg: 'Authorization deined' }.code(401));
      }

      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.user = decoded.user;
      } catch (err) {
        return h.response('Token is not valid').code(401);
      }

      const { name, email, description, phone } = request.payload;
      const profileFields = {};
      if (name) profileFields.name = name;
      if (email) profileFields.email = email;
      if (description) profileFields.description = description;
      if (phone) profileFields.phone = phone;

      try {
        let profile = await Profile.findById(request.params.id);
        if (!profile) return h.response({ msg: 'Contact not found' }).code(404);

        profile = await Profile.findByIdAndUpdate(
          request.params.id,
          { $set: profileFields },
          { new: true }
        );
        return h.response(profile);
      } catch (err) {
        console.error(err.message);
        return h.response('Server Error').code(500);
      }
    }
  }
];
