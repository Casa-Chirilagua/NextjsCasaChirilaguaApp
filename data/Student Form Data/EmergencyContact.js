const EmergencyContact = {
    title: 'Emergency Contact Information',
    fields: [
      {
        type: 'text',
        name_of_json_field: 'emergency_first_name',
        placeholder: 'Enter First Name',
        required: true,
        required_message: 'Please enter a first name',
        data: {},
        label: 'First Name',
        id: '',
      },
      {
        type: 'text',
        name_of_json_field: 'emergency_last_name',
        placeholder: 'Enter Last Name',
        required: true,
        required_message: 'Please enter a last name',
        data: {},
        label: 'Last Name',
        id: '',
      },
      {
        type: 'phone',
        name_of_json_field: 'emergency_phone',
        placeholder: 'Enter Mobile Phone',
        required: true,
        required_message: 'Please enter a phone number.',
        data: {},
        label: 'Mobile Phone',
        id: 'inputphone4',
      },
      {
        "type": "select",
        "name_of_json_field": "relationship",
        "placeholder": "Relationship",
        "required": true,
        "required_message": "",
        "data": [
          { "name": "Uncle"},
          { "name": "Aunt"},
          { "name": "Brother"},
          { "name": "Sister"},
          { "name": "Other"}
        ],
        "label": "Relationship",
        "id": "inputRelationship"
      }
    ],
  };

  export default EmergencyContact;