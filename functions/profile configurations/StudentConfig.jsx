// import moment from 'moment';
import ConvertToUSADate from "../ConvertToUSADate";

//Functions
import GetItemByJsonFieldName from "../student functions/GetItemByJsonFieldName";

//Data
import StudentInformation from "../../data/Student Form Data/StudentInformation";
import EmergencyContact from "@/data/Student Form Data/EmergencyContact";
import MedicalInformation from "@/data/Student Form Data/MedicalInformation";
import MedicalInsurance from "@/data/Student Form Data/MedicalInsurance";


function StudentConfig(student) {

  const allFormData = { fields: [ ...StudentInformation.fields, ...EmergencyContact.fields, ...MedicalInformation.fields, ...MedicalInsurance.fields ] };

  console.log(allFormData);

  const studentBooleanCheck = (value) => {
    if (value === true) {
      return "Yes";
    } else if (value === false) {
      return "No";
    } else {
      return value;
    }
  }

  const fields = {
    'Personal Information': {
      'First Name': {
        value: student?.first_name ? student.first_name : '',
        name_of_json_field: 'first_name',
        form_data: GetItemByJsonFieldName("first_name", allFormData),
        can_edit: true,
      },
      'Middle Name': {
        value: student?.middle_name ? student.middle_name : '',
        name_of_json_field: 'middle_name',
        form_data: GetItemByJsonFieldName("middle_name", allFormData),
        can_edit: true,
      },
      'Last Name': {
        value: student?.last_name ? student.last_name : '',
        name_of_json_field: 'last_name',
        form_data: GetItemByJsonFieldName("last_name", allFormData),
        can_edit: true,
      },
      Email: {
        value: student?.email ? student.email : '',
        name_of_json_field: 'email',
        form_data: GetItemByJsonFieldName("email", allFormData),
        can_edit: true,
      },
      Phone: {
        value: student?.phone ? student.phone : '',
        name_of_json_field: 'phone',
        form_data: GetItemByJsonFieldName("phone", allFormData),
        can_edit: true,
      },
      Grade: {
        value: student?.grade ? student.grade : '',
        name_of_json_field: 'grade',
        form_data: GetItemByJsonFieldName("grade", allFormData),
        can_edit: true,
      },
      School: {
        value: student?.school ? student.school : '',
        name_of_json_field: 'school',
        form_data: GetItemByJsonFieldName("school", allFormData),
        can_edit: true,
      },
      'Date of birth': {
        value: ConvertToUSADate(student?.date_of_birth),
        name_of_json_field: 'date_of_birth',
        form_data: GetItemByJsonFieldName("date_of_birth", allFormData),
        can_edit: true,
      },
      'Does the student receive free or reduced lunch?': {
        value: student?.free_and_reduced_lunch ? 'Yes' : 'No',
        name_of_json_field: 'free_and_reduced_lunch',
        form_data: GetItemByJsonFieldName("free_and_reduced_lunch", allFormData),
        can_edit: true,
      },
      "Graduation date": {
        value: ConvertToUSADate(student?.high_school_graduation_date),
        name_of_json_field: 'high_school_graduation_date',
        form_data: {
          fields: [
            {
              type: 'date',
              name_of_json_field: 'high_school_graduation_date',
              placeholder: 'Enter graduation date',
              required: true,
              required_message: 'Please select a graduation date',
              data: {},
              label: 'Graduation Date',
              id: '',
            }]
        },
        can_edit: true,
      }
      ,
      "Created at": {
        value: ConvertToUSADate(student?.created_at),
        name_of_json_field: 'created_at',
        form_data: GetItemByJsonFieldName("created_at", allFormData),
        can_edit: false,
      },

    },
    Address: {
      Street: {
        value: student?.address ? student.address.street : '',
        name_of_json_field: 'address.street',
        form_data: GetItemByJsonFieldName("address.street", allFormData),
        can_edit: true,
      },
      'Address Line 2': {
        value: student?.address
          ? student.address.address_line_2
          : '',
        name_of_json_field: 'address.address_line_2',
        form_data: GetItemByJsonFieldName("address.address_line_2", allFormData),
        can_edit: true,
      },
      City: {
        value: student?.address ? student.address.city : '',
        name_of_json_field: 'address.city',
        form_data: GetItemByJsonFieldName("address.city", allFormData),
        can_edit: true,
      },
      State: {
        value: student?.address ? student.address.state : '',
        name_of_json_field: 'address.state',
        form_data: GetItemByJsonFieldName("address.state", allFormData),
        can_edit: true,
      },
      Zip: {
        value: student?.address ? student.address.zip : '',
        name_of_json_field: 'address.zip',
        form_data: GetItemByJsonFieldName("address.zip", allFormData),
        can_edit: true,
      },
    },
    'Emergency Contact': {
      'First Name': {
        value: student?.emergency_contact
          ? student.emergency_contact.first_name
          : '',
        name_of_json_field: 'emergency_contact.first_name',
        form_data: GetItemByJsonFieldName("emergency_contact.first_name", allFormData),
        can_edit: true,
      },
      'Last Name': {
        value: student?.emergency_contact
          ? student.emergency_contact.last_name
          : '',
        name_of_json_field: 'emergency_contact.last_name',
        form_data: GetItemByJsonFieldName("emergency_contact.last_name", allFormData),
        can_edit: true,
      },
      Phone: {
        value: student?.emergency_contact
          ? student.emergency_contact.phone
          : '',
        name_of_json_field: 'emergency_contact.phone',
        form_data: GetItemByJsonFieldName("emergency_contact.phone", allFormData),
        can_edit: true,
      },
      Relationship: {
        value: student?.emergency_contact
          ? student.emergency_contact.relationship
          : '',
        name_of_json_field: 'emergency_contact.relationship',
        form_data: GetItemByJsonFieldName("emergency_contact.relationship", allFormData),
        can_edit: true,
      },
    },
    'Medical Insurance': {
      'Policy Number': {
        value: student?.health_care
          ? student.health_care.policy_number
          : '',
        name_of_json_field: 'health_care.policy_number',
        form_data: GetItemByJsonFieldName("health_care.policy_number", allFormData),
        can_edit: true,
      },
      'Primary doctor first name': {
        value: student?.health_care?.doctor_first_name
          ? student.health_care.doctor_first_name
          : '',
        name_of_json_field: 'health_care.doctor_first_name',
        form_data: GetItemByJsonFieldName("health_care.doctor_first_name", allFormData),
        can_edit: true,
      },
      'Primary doctor last name': {
        value: student?.health_care?.doctor_last_name ? student.health_care.doctor_last_name : '',
        name_of_json_field: 'health_care.doctor_last_name',
        form_data: GetItemByJsonFieldName("health_care.doctor_last_name", allFormData),
        can_edit: true,
      },
      'Doctors phone number': {
        value: student?.health_care?.phone ? student.health_care.phone : '',
        name_of_json_field: 'health_care.phone',
        form_data: GetItemByJsonFieldName("health_care.phone", allFormData),
        can_edit: true,
      },
    },
    'Medical Information': {
      'Does the student have allergies': {
        value: student?.medical_information
          ? studentBooleanCheck(student.medical_information.has_allergies)
          : '',
        name_of_json_field: 'medical_information.has_allergies',
        form_data: GetItemByJsonFieldName("medical_information.has_allergies", allFormData),
        can_edit: true,
      },
      'Allergy Description': {
        value: student?.medical_information
          ? student.medical_information.allergy_description
          : '',
        name_of_json_field: 'medical_information.allergy_description',
        form_data: GetItemByJsonFieldName("medical_information.allergy_description", allFormData),
        can_edit: true,
      },
      'Does the student have epilepsy': {
        value: student?.medical_information?.has_epilepsy
          ? studentBooleanCheck(student.medical_information.has_epilepsy)
          : '',
        name_of_json_field: 'medical_information.has_epilepsy',
        form_data: GetItemByJsonFieldName("medical_information.has_epilepsy", allFormData),
        can_edit: true,
      },
      'Epilepsy Description': {
        value: student?.medical_information
          ? student.medical_information.epilepsy_description
          : '',
        name_of_json_field: 'medical_information.epilepsy_description',
        form_data: GetItemByJsonFieldName("medical_information.epilepsy_description", allFormData),
        can_edit: true,
      },
      'Does the student have asthma': {
        value: student?.medical_information
          ? studentBooleanCheck(student.medical_information.has_asthma)
          : '',
        name_of_json_field: 'medical_information.has_asthma',
        form_data: GetItemByJsonFieldName("medical_information.has_asthma", allFormData),
        can_edit: true,
      },
      'Asthma Description': {
        value: student?.medical_information
          ? student?.medical_information.asthma_description
          : '',
        name_of_json_field: 'medical_information.asthma_description',
        form_data: GetItemByJsonFieldName("medical_information.asthma_description", allFormData),
        can_edit: true,
      },
      'Does the student have food restrictions': {
        value: student?.medical_information
          ? studentBooleanCheck(student.medical_information.has_food_restrictions)
          : '',
        name_of_json_field: 'medical_information.has_food_restrictions',
        form_data: GetItemByJsonFieldName("medical_information.has_food_restrictions", allFormData),
        can_edit: true,
      },
      'Food Description': {
        value: student?.medical_information
          ? student.medical_information.food_description
          : '',
        name_of_json_field: 'medical_information.food_description',
        form_data: GetItemByJsonFieldName("medical_information.food_description", allFormData),
        can_edit: true,
      },
      'Does the student have other restrictions': {
        value: student?.medical_information
          ? studentBooleanCheck(student.medical_information.has_other_restrictions)
          : '',
        name_of_json_field: 'medical_information.has_other_restrictions',
        form_data: GetItemByJsonFieldName("medical_information.has_other_restrictions", allFormData),
        can_edit: true,
      },
      'Other restrictions description': {
        value: student?.medical_information
          ? student.medical_information.other_restrictions_description
          : '',
        name_of_json_field: 'medical_information.other_restrictions_description',
        form_data: GetItemByJsonFieldName("medical_information.other_restrictions_description", allFormData),
        can_edit: true,
      },
    },
  };

  return fields;
}

export default StudentConfig;
