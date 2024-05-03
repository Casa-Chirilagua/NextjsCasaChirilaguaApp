function ParentConfig(parent) {
  const fields = {
    'Personal Information': {
      'First Name': {
        value: parent.first_name ? parent.first_name : '',
        name_of_json_field: 'guardian_one_first_name',
        database_field_name: 'first_name',
        hasObject: false,
      },
      'Middle Name': {
        value: parent.middle_name ? parent.middle_name : '',
        name_of_json_field: 'guardian_one_middle_name',
        database_field_name: 'middle_name',
        hasObject: false,
      },
      'Last Name': {
        value: parent.last_name ? parent.last_name : '',
        name_of_json_field: 'guardian_one_last_name',
        database_field_name: 'last_name',
        hasObject: false,
      },
      Email: {
        value: parent.email ? parent.email : '',
        name_of_json_field: 'guardian_one_email',
        database_field_name: 'email',
        hasObject: false,
      },
      Phone: {
        value: parent.phone ? parent.phone : '',
        name_of_json_field: 'guardian_one_phone',
        database_field_name: 'phone',
        hasObject: false,
      },
      'Can Receive Messages': {
        value: parent.can_receive_text ? 'Yes' : 'No',
        name_of_json_field: 'guardian_one_can_recieve_messages',
        database_field_name: 'guardian_one_can_recieve_messages',
        hasObject: false,
      },
    },
    Address: {
      Street: {
        value: parent.address ? parent.address.street : '',
        name_of_json_field: 'mothers_street',
        database_field_name: 'street',
        hasObject: true,
        objectName: 'address',
      },
      'Address Line 2': {
        value: parent.address ? parent.address.address_line_2 : '',
        name_of_json_field: 'mothers_adress_line_2',
        database_field_name: 'address_line_2',
        hasObject: true,
        objectName: 'address',
      },
      City: {
        value: parent.address ? parent.address.city : '',
        name_of_json_field: 'mothers_city',
        database_field_name: 'city',
        hasObject: true,
        objectName: 'address',
      },
      State: {
        value: parent.address ? parent.address.state : '',
        name_of_json_field: 'mothers_state',
        database_field_name: 'state',
        hasObject: true,
        objectName: 'address',
      },
      Zip: {
        value: parent.address ? parent.address.zip : '',
        name_of_json_field: 'mothers_zip',
        database_field_name: 'zip',
        hasObject: true,
        objectName: 'address',
      },
    },
  };
  return fields;
}

export default ParentConfig;
