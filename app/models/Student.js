import mongoose, { Schema, model, models } from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    // This is the student's full name
    type: String,
    required: [true, "A student must have a name"],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "A student must have a first name"],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, "A student must have a last name"],
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
  graduated_high_school: {
    type: Boolean,
    default: false,
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
  emergency_contact: {
    // This is the student's emergency contact information
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
  medical_information: {
    // This is the student's medical information
    has_allergies: {
      type: Boolean,
      default: false,
    },
    has_epilepsy: {
      type: Boolean,
      default: false,
    },
    has_asthma: {
      type: Boolean,
      default: false,
    },
    has_food_restrictions: {
      type: Boolean,
      default: false,
    },
    has_other_restrictions: {
      type: Boolean,
      default: false,
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
    other_restrictions_description: {
      type: String,
    },
  },
  has_health_care: {
    type: Boolean,
    default: false,
  },
  health_care: {
    // This is the student's health care information
    policy_number: {
      type: String,
    },
    doctor_first_name: {
      type: String,
    },
    doctor_last_name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },

  notes: [
    // This is the student's notes
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
      ref: "Parent",
    },
  ],
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
  profile_image: [
    {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dnmsdb199/image/upload/v1697550810/profile_picture_twgc2q.jpg",
      },
      public_id: {
        type: String,
        default: "",
      },
      filename: {
        type: String,
        default: "CasaApp/default_z5hjmp",
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
    type: String,
  },
});

const Student = models.Student || model("Student", StudentSchema);
export default Student;
