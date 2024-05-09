import mongoose, {Schema, model, models} from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {  // This is the student's full name
    type: String,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  high_school_graduation_date: {
    type: Date,
  },
  address: {
    street: {
      type: String,
    },
    address_line_2: String,
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  school: {
    type: String,
  },
  grade: {
    type: Number,
  },
  free_and_reduced_lunch: {
    type: Boolean,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  gender: {
    type: String,
  },
  reading_level: {
    type: String,
  },
  emergency_contact: { // This is the student's emergency contact information
    first_name: {
      type: String,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    relationship: {
      type: String,
    },
  },
  medical_information: { // This is the student's medical information
    has_allergies: {
      type: Boolean,
    },
    has_epilepsy: {
      type: Boolean,
    },
    has_asthma: {
      type: Boolean,
    },
    has_food_restriction: {
      type: Boolean,
    },
    has_other_restrictions: {
      type: Boolean,
    },
    allergy_description: {
      type: String,
    },
    epilepsy_description: {
      type: String,
    },
    asthma_description: {
      type: String,
    },
    food_description: {
      type: String,
    },
    other_description: {
      type: String,
    },
  },

  health_care: { // This is the student's health care information
    policy_number: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    doctor_name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },

  history: [ // This is the student's history
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

  notes: [ // This is the student's notes
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
    },
  ],
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
  profile_image: [
    {
      url: {
        type: String,
        default:
          'https://res.cloudinary.com/dnmsdb199/image/upload/v1697550810/profile_picture_twgc2q.jpg',
      },
      filename: {
        type: String,
        default: 'CasaApp/default_z5hjmp',
      },
    },
  ],
  enrollment_date: {
    type: Date,
    default: Date.now(),
  },
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

const Student = models.Student || model('Student', StudentSchema);
export default Student;