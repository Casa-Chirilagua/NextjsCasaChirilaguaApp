// const mongoose = require('mongoose');
import mongoose, { Schema, model, models } from "mongoose";

const ParentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Parent must have a name"],
  },
  first_name: {
    type: String,
    required: [true, "Parent must have a first name"],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, "Parent must have a last name"],
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
  on_whats_app_group_chat: {
    type: Boolean,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
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
      ref: "Student",
    },
  ],
  family_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
  profile_image: [
    {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dnmsdb199/image/upload/v1697743188/CasaApp/cllcl8x3t79yrjeur0ud.jpg",
      },
      filename: {
        type: String,
        default: "CasaApp/default_z5hjmp",
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
    type: String,
    ref: "User",
  },
});

const Parent = models.Parent || model("Parent", ParentSchema);
export default Parent;
