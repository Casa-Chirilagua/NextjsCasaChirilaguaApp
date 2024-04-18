// const mongoose = require("mongoose");

import mongoose, {Schema, model, models} from 'mongoose';


const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The Name of the School is required"],
    unique: true,
  },
  address: {
    street: {
      type: String,
      required:[true, "School street address is required"],
    },
    address_line_2: String,
    city: {
      type: String,
      required: [true, 'The city the school is in is required'],
    },
    state: {
      type: String,
      required: [true, 'The state the school is in is required'],
    },
    zip: {
      type: String,
      required: [true, 'The zip code the school is in is'],
    },
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
  students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, 'A school must have students'],
  }],
  profile_image: [{ url: String, filename: String}],

});

const School = models.School || model('School', SchoolSchema);
export default School;