//Functions
import GetItemByJsonFieldName from "../student functions/GetItemByJsonFieldName";

//Data 
import Guardian from "@/data/Student Form Data/Guardian";

function ParentConfig(parent) {
  const fields = {
    'Personal Information': {
      'First Name': {
        value: parent?.first_name ? parent.first_name : '',
        name_of_json_field: 'first_name',
        form_data: GetItemByJsonFieldName("first_name", Guardian),
        can_edit: true,
      },
      'Middle Name': {
        value: parent?.middle_name ? parent.middle_name : '',
        name_of_json_field: 'middle_name',
        form_data: GetItemByJsonFieldName("middle_name", Guardian),
        can_edit: true,
      },
      'Last Name': {
        value: parent?.last_name ? parent.last_name : '',
        name_of_json_field: 'last_name',
        form_data: GetItemByJsonFieldName("last_name", Guardian),
        can_edit: true,
      },
      Email: {
        value: parent?.email ? parent.email : '',
        name_of_json_field: 'email',
        form_data: GetItemByJsonFieldName("email", Guardian),
        can_edit: true,
      },
      Phone: {
        value: parent?.phone ? parent.phone : '',
        name_of_json_field: 'phone',
        form_data: GetItemByJsonFieldName("phone", Guardian),
        can_edit: true,
      },
      'Can Receive Messages': {
        value: parent?.can_receive_text ? 'Yes' : 'No',
        name_of_json_field: 'can_recieve_messages',
        form_data: GetItemByJsonFieldName("can_recieve_messages", Guardian),
        can_edit: true,    
      },
    },
    Address: {
      Street: {
        value: parent?.address ? parent.address.street : '',
        name_of_json_field: 'address.street',
        form_data: GetItemByJsonFieldName("address.street", Guardian),
        can_edit: true,
      },
      'Address Line 2': {
        value: parent?.address ? parent.address.address_line_2 : '',
        name_of_json_field: 'address.address_line_2',
        form_data: GetItemByJsonFieldName("address.address_line_2", Guardian),
        can_edit: true,
      },
      City: {
        value: parent?.address ? parent.address.city : '',
        name_of_json_field: 'address.city',
        form_data: GetItemByJsonFieldName("address.city", Guardian),
        can_edit: true,
      },
      State: {
        value: parent?.address ? parent.address.state : '',
        name_of_json_field: 'address.state',
        form_data: GetItemByJsonFieldName("address.state", Guardian),
        can_edit: true,
      },
      Zip: {
        value: parent?.address ? parent.address.zip : '',
        name_of_json_field: 'address.zip',
        form_data: GetItemByJsonFieldName("address.zip", Guardian),
        can_edit: true,
      },
    },
  };
  return fields;
}

export default ParentConfig;
