const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users'
  //   },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
