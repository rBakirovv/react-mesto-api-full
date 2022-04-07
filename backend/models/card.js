const mongoose = require('mongoose');
const { isURL } = require('validator');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: user,
  },
  likes: [{
    type: mongoose.ObjectId,
    default: [],
    ref: user,
  }],
  createdAt: [{
    type: Date,
    default: Date.now(),
  }],
});

module.exports = mongoose.model('card', cardSchema);
