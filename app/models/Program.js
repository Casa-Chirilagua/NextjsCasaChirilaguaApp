// const mongoose = require("mongoose");
import mongoose, {Schema, model, models} from 'mongoose';


const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Program should have a name'],
  },
  description: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  cost: {
    type: Number,
  },
  volunteer_capacity: {
    type: Number,
    // required: [true, "Program should have a volunteer capacity"],
  },
  program_capacity: {
    type: Number,
    // require: [true, "Program should have a program capacity"],
  },
  student_enrolled: {
    type: Number,
  },
  when: {
    type: String,
    // required: [true,,"When does the prgram meet"],
  },
  commitment: {
    type: String,
    // required: [true,"What are the commitments for the program"],
  },
  location: {
    type: String,
    // required: [true, "Location of the program is required"],
  },
  responsibility: {
    type: String,
    // required: [true, "Responsibility of the program is required"],
  },
  additional_notes: {
    type: String,
  },
  training: {
    type: String,
    // required: [true, "Training for the program is required"],
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
      ref: "Student",
    },
  ],

  students_v2: [
    {
      name: {
        type: String,
      },
      enrollment_status:{
        type:Boolean,
        default:false
      },
      enrollment_date:{
        type:Date,
        default:Date.now()
      },
      completed:{
        type:Boolean,
        default:false
      },
      completion_date:{
        type:Date
      },
    }
  ],
  
  profile_image: [
    {
      url: { type: String, default: 'https://res.cloudinary.com/dnmsdb199/image/upload/v1697551214/default_program_picture_c31mld.jpg' },
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

// module.exports = Program = mongoose.model("Program", ProgramSchema);

const Program = models.Program || model('Program', ProgramSchema);
export default Program;