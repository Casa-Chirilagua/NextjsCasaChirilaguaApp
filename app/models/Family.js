import mongoose, {Schema, model, models} from 'mongoose';

const FamilySchema = new mongoose.Schema({
  family_name: {
    type: String,
    require: [true, 'A family must hava a name'],
    unique: true,
  },
  primary_address: {
    street: {
      type: String,
      // required: [true, "a family must have a street address"],
    },
    address_line_2: String,
    city: {
      type: String,
      // required: [true,'a family must have a city address'],
    },
    state: {
      type: String,
      // required: [true, 'a family must have a state'],
    },
    zip: {
      type: String,
      // required: [true, 'a familiy must have a zip code'],
    },
  },
  primary_email: {
    type: String,
  },
  primary_phone: {
    type: String,
    // required: [true, 'a family must have a primary phone number'],
  },
  origin_country: {
    type: String,
  },
  year_started_at_casa: {
    type: Date,
  },
  year_of_disenrollment: {
    type: Date,
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
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
      required: [true, 'A family must have parents'],
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'A family must have students'],
    },
  ],
  profile_image: [
    {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dnmsdb199/image/upload/v1697551214/default_program_picture_c31mld.jpg',
      },
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

const Family = models.Family || model('Family', FamilySchema);
export default Family;
