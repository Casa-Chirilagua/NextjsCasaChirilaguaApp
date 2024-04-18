// const mongoose = require('mongoose');
import mongoose, {Schema, model, models} from 'mongoose';

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,

  },
  name: {
    type: String,
    required: false,

  },
  nickname:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    url:{
      type: String
    }
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// module.exports = User = mongoose.model('user', UserSchema);

const User = models.User || model('User', UserSchema);
export default User;