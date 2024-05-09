// import moment from 'moment';
import ConvertToUSADate from "../ConvertToUSADate";

//Functions
import GetItemByJsonFieldName from "../student functions/GetItemByJsonFieldName";

//Data
import StudentInformation from "../../data/Student Form Data/StudentInformation";

function StudentConfig(student) {
  const fields = {
    'Personal Information': {
      'First Name': {
        value: student.first_name ? student.first_name : '',
        name_of_json_field: 'first_name',
        database_field_name: 'first_name',
        form_data: GetItemByJsonFieldName("first_name", StudentInformation),
        hasObject: false,
      },
      'Middle Name': {
        value: student.middle_name ? student.middle_name : '',
        name_of_json_field: 'middle_name',
        database_field_name: 'middle_name',
        form_data: GetItemByJsonFieldName("middle_name", StudentInformation),
        hasObject: false,
      },
      'Last Name': {
        value: student.last_name ? student.last_name : '',
        name_of_json_field: 'last_name',
        database_field_name: 'last_name',
        form_data: GetItemByJsonFieldName("last_name", StudentInformation),
        hasObject: false,
      },
      Email: {
        value: student.email ? student.email : '',
        name_of_json_field: 'email',
        database_field_name: 'email',
        form_data: GetItemByJsonFieldName("email", StudentInformation),
        hasObject: false,
      },
      Phone: {
        value: student.phone ? student.phone : '',
        name_of_json_field: 'phone',
        database_field_name: 'phone',
        form_data: GetItemByJsonFieldName("phone", StudentInformation),
        hasObject: false,
      },
      Grade: {
        value: student.grade ? student.grade : '',
        name_of_json_field: 'grade',
        database_field_name: 'grade',
        form_data: GetItemByJsonFieldName("grade", StudentInformation),
        hasObject: false,
      },
      School: {
        value: student.school ? student.school : '',
        name_of_json_field: 'school',
        database_field_name: 'school',
        form_data: GetItemByJsonFieldName("school", StudentInformation),
        hasObject: false,
      },
      'Date of birth': {
        value: ConvertToUSADate(student.date_of_birth),
        name_of_json_field: 'date_of_birth',
        database_field_name: 'date_of_birth',
        form_data: GetItemByJsonFieldName("date_of_birth", StudentInformation),
        hasObject: false,
      },
      'Does the student receive free or reduced lunch?': {
        value: student.free_and_reduced_lunch? 'Yes' : 'No',
        name_of_json_field: 'free_and_reduced_lunch',
        database_field_name: 'free_and_reduced_lunch',
        form_data: GetItemByJsonFieldName("free_and_reduced_lunch", StudentInformation),
        hasObject: false,
      },
      "Created at": {
        value: ConvertToUSADate(student.created_at),
        name_of_json_field: 'created_at',
        database_field_name: 'created_at',
        form_data: GetItemByJsonFieldName("created_at", StudentInformation),
        hasObject: false,
      },
      
    },
    Address: {
      Street: {
        value: student.address ? student.address.street : '',
        name_of_json_field: 'street',
        database_field_name: 'street',
        form_data: GetItemByJsonFieldName("street", StudentInformation),
        hasObject: true,
        objectName: 'address',
      },
      'Address Line 2': {
        value: student.address 
          ? student.address.address_line_2
          : '',
        name_of_json_field: 'address_line_2',
        database_field_name: 'address_line_2',
        form_data: GetItemByJsonFieldName("address_line_2", StudentInformation),
        hasObject: true,
        objectName: 'address',
      },
      City: {
        value: student.address ? student.address.city : '',
        name_of_json_field: 'city',
        database_field_name: 'city',
        form_data: GetItemByJsonFieldName("city", StudentInformation),
        hasObject: true,
        objectName: 'address',
      },
      State: {
        value: student.address? student.address.state : '',
        name_of_json_field: 'state',
        database_field_name: 'state',
        form_data: GetItemByJsonFieldName("state", StudentInformation),
        hasObject: true,
        objectName: 'address',
      },
      Zip: {
        value: student.address ? student.address.zip : '',
        name_of_json_field: 'zip',
        database_field_name: 'zip',
        form_data: GetItemByJsonFieldName("zip", StudentInformation),
        hasObject: true,
        objectName: 'address',
      },
    },
    'Emergency Contact': {
      Name: {
        value: student.emergency_contact
          ? student.emergency_contact.first_name
          : '',
        name_of_json_field: 'emergency_first_name',
        database_field_name: 'first_name',
        form_data: GetItemByJsonFieldName("emergency_first_name", StudentInformation),
        hasObject: true,
        objectName: 'emergency_contact',
      },
      'Last Name': {
        value: student.emergency_contact
          ? student.emergency_contact.last_name
          : '',
        name_of_json_field: 'emergency_last_name',
        database_field_name: 'last_name',
        form_data: GetItemByJsonFieldName("emergency_last_name", StudentInformation),
        hasObject: true,
        objectName: 'emergency_contact',
      },
      Phone: {
        value: student.emergency_contact
          ? student.emergency_contact.phone
          : '',
        name_of_json_field: 'emergency_phone',
        database_field_name: 'phone',
        form_data: GetItemByJsonFieldName("emergency_phone", StudentInformation),
        hasObject: true,
        objectName: 'emergency_contact',
      },
      Relationship: {
        value: student.emergency_contact
          ? student.emergency_contact.relationship
          : '',
        name_of_json_field: 'relationship',
        database_field_name: 'relationship',
        form_data: GetItemByJsonFieldName("relationship", StudentInformation),
        hasObject: true,
        objectName: 'emergency_contact',
      },
    },
    'Medical Insurance': {
      'Policy Number': {
        value: student.health_care
          ? student.health_care.policy_number
          : '',
        name_of_json_field: 'policy_number',
        database_field_name: 'policy_number',
        form_data: GetItemByJsonFieldName("policy_number", StudentInformation),
        hasObject: true,
        objectName: 'health_care',
      },
      'Primary doctor first name': {
        value: student.health_care
          ? student.health_care.first_name
          : '',
        name_of_json_field: 'first_name',
        database_field_name: 'first_name',
        form_data: GetItemByJsonFieldName("first_name", StudentInformation),
        hasObject: true,
        objectName: 'health_care',
      },
      'Primary doctor last name': {
        value: student.health_care ? student.health_care.last_name : '',
        name_of_json_field: 'last_name',
        database_field_name: 'last_name',
        form_data: GetItemByJsonFieldName("last_name", StudentInformation),
        objectName: 'health_care',
      },
      'Doctors phone number': {
        value: student.health_care ? student.health_care.phone : '',
        name_of_json_field: 'doctors_phone',
        database_field_name: 'phone',
        form_data: GetItemByJsonFieldName("doctors_phone", StudentInformation),
        hasObject: true,
        objectName: 'health_care',
      },
    },
    'Medical Information': {
      'Does the student have allergies': {
        value: student.medical_information
          ? student.medical_information.has_allergies
          : '',
        name_of_json_field: 'has_allergies',
        database_field_name: 'has_allergies',
        form_data: GetItemByJsonFieldName("has_allergies", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Allergy Description': {
        value: student.medical_information
          ? student.medical_information.allergy_description
          : '',
        name_of_json_field: 'allergy_description',
        database_field_name: 'allergy_description',
        form_data: GetItemByJsonFieldName("allergy_description", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Does the student have epilepsy': {
        value: student.medical_information
          ? student.medical_information.has_epilepsy
          : '',
        name_of_json_field: 'has_epilepsy',
        database_field_name: 'has_epilepsy',
        form_data: GetItemByJsonFieldName("has_epilepsy", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Epilepsy Description': {
        value: student.medical_information
          ? student.medical_information.epilepsy_description
          : '',
        name_of_json_field: 'epilepsy_description',
        database_field_name: 'epilepsy_description',
        form_data: GetItemByJsonFieldName("epilepsy_description", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Does the student have asthma': {
        value: student.medical_information
          ? student.medical_information.has_asthma
          : '',
        name_of_json_field: 'has_asthma',
        database_field_name: 'has_asthma',
        form_data: GetItemByJsonFieldName("has_asthma", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Asthma Description': {
        value: student.medical_information
          ? student.medical_information.asthma_description
          : '',
        name_of_json_field: 'asthma_description',
        database_field_name: 'asthma_description',
        form_data: GetItemByJsonFieldName("asthma_description", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Does the student have food restrictions': {
        value: student.medical_information
          ? student.medical_information.has_food_restrictions
          : '',
        name_of_json_field: 'has_food_restrictions',
        database_field_name: 'has_food_restrictions',
        form_data: GetItemByJsonFieldName("has_food_restrictions", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Food Description': {
        value: student.medical_information
          ? student.medical_information.food_description
          : '',
        name_of_json_field: 'food_description',
        database_field_name: 'food_description',
        form_data: GetItemByJsonFieldName("food_description", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Does the student have other restrictions': {
        value: student.medical_information
          ? student.medical_information.has_other_restrictions
          : '',
        name_of_json_field: 'has_other_restrictions',
        database_field_name: 'has_other_restrictions',
        form_data: GetItemByJsonFieldName("has_other_restrictions", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
      'Other Restrictions Description': {
        value: student.medical_information
          ? student.medical_information.other_restrictions_description
          : '',
        name_of_json_field: 'other_restrictions_description',
        database_field_name: 'other_restrictions_description',
        form_data: GetItemByJsonFieldName("other_restrictions_description", StudentInformation),
        hasObject: true,
        objectName: 'medical_information',
      },
    },
  };

  return fields;
}

export default StudentConfig;
