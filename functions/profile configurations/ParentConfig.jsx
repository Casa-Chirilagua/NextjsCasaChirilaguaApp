//Functions
import GetItemByJsonFieldName from "../student functions/GetItemByJsonFieldName";

//Data 
import GuardianOne from "@/data/Student Form Data/GuardianOne";

function ParentConfig(parent) {
  const fields = {
    'Personal Information': {
      'First Name': {
        value: parent.first_name ? parent.first_name : '',
        name_of_json_field: 'guardian_one_first_name',
        database_field_name: 'first_name',
        form_data: GetItemByJsonFieldName("guardian_one_first_name", GuardianOne),
        hasObject: false,
      },
      'Middle Name': {
        value: parent.middle_name ? parent.middle_name : '',
        name_of_json_field: 'guardian_one_middle_name',
        database_field_name: 'middle_name',
        form_data: GetItemByJsonFieldName("guardian_one_middle_name", GuardianOne),
        hasObject: false,
      },
      'Last Name': {
        value: parent.last_name ? parent.last_name : '',
        name_of_json_field: 'guardian_one_last_name',
        database_field_name: 'last_name',
        form_data: GetItemByJsonFieldName("guardian_one_last_name", GuardianOne),
        hasObject: false,
      },
      Email: {
        value: parent.email ? parent.email : '',
        name_of_json_field: 'guardian_one_email',
        database_field_name: 'email',
        form_data: GetItemByJsonFieldName("guardian_one_email", GuardianOne),
        hasObject: false,
      },
      Phone: {
        value: parent.phone ? parent.phone : '',
        name_of_json_field: 'guardian_one_phone',
        database_field_name: 'phone',
        form_data: GetItemByJsonFieldName("guardian_one_phone", GuardianOne),
        hasObject: false,
      },
      'Can Receive Messages': {
        value: parent.can_receive_text ? 'Yes' : 'No',
        name_of_json_field: 'guardian_one_can_recieve_messages',
        database_field_name: 'guardian_one_can_recieve_messages',
        form_data: GetItemByJsonFieldName("guardian_one_can_recieve_messages", GuardianOne),    
        hasObject: false,
      },
    },
    Address: {
      Street: {
        value: parent.address ? parent.address.street : '',
        name_of_json_field: 'mothers_street',
        database_field_name: 'street',
        form_data: GetItemByJsonFieldName("mothers_street", GuardianOne),
        hasObject: true,
        objectName: 'address',
      },
      'Address Line 2': {
        value: parent.address ? parent.address.address_line_2 : '',
        name_of_json_field: 'mothers_adress_line_2',
        database_field_name: 'address_line_2',
        form_data: GetItemByJsonFieldName("mothers_adress_line_2", GuardianOne),
        hasObject: true,
        objectName: 'address',
      },
      City: {
        value: parent.address ? parent.address.city : '',
        name_of_json_field: 'mothers_city',
        database_field_name: 'city',
        form_data: GetItemByJsonFieldName("mothers_city", GuardianOne),
        hasObject: true,
        objectName: 'address',
      },
      State: {
        value: parent.address ? parent.address.state : '',
        name_of_json_field: 'mothers_state',
        database_field_name: 'state',
        form_data: GetItemByJsonFieldName("mothers_state", GuardianOne),
        hasObject: true,
        objectName: 'address',
      },
      Zip: {
        value: parent.address ? parent.address.zip : '',
        name_of_json_field: 'mothers_zip',
        database_field_name: 'zip',
        form_data: GetItemByJsonFieldName("mothers_zip", GuardianOne),
        hasObject: true,
        objectName: 'address',
      },
    },
  };
  return fields;
}

export default ParentConfig;
