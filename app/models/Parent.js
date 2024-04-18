// const mongoose = require('mongoose');
import mongoose, {Schema, model, models} from 'mongoose';



const ParentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, 'Parent must have a first name'],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, 'Parent must have a last name'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    // required: [true, 'Parent must have a phone'],
  },
  address: {
    street: {
      type: String,
      // required: [true, 'Parent must have a street address'],
    },
    address_line_2: String,
    city: {
      type: String,
      // required: [true, 'Parent must have a city'],
    },
    state: {
      type: String,
      // required: [true, 'Parent must have a state'],
    },
    zip: {
      type: String,
      // required: [true, 'Parent must have a zip code'],
    },
  },
  can_receive_text: {
    type: Boolean,
  },
  on_whats_app_group_chat:{
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  history: [
    {
      field_edited: {
        type: String,
      },
      old_value: { type: String },
      edited_by: {
        type: String,
      },
      date_edited: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  notes: [
    {
      description: {
        type: String,
      },
      date_created: {
        type: Date,
        default: Date.now(),
      },
      original_author: {
        type: String,
      },
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  family_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
  },
  profile_image: [
    {
      url: { type: String, default: 'https://res.cloudinary.com/dnmsdb199/image/upload/v1697743188/CasaApp/cllcl8x3t79yrjeur0ud.jpg' },
      filename: {
        type: String,
        default: 'CasaApp/default_z5hjmp',
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// module.exports = Parent = mongoose.model('Parent', ParentSchema);


const Parent = models.Parent || model('Parent', ParentSchema);
export default Parent;