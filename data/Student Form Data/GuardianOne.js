import states from '../States';

const GuardianOne = {
  title: 'Guardian Information',
  fields: [
    {
      type: 'section',
      label: 'Guardian Information',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.first_name',
      placeholder: 'John',
      required: true,
      required_message: 'Please enter a first name',
      data: {},
      label: 'First Name',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.middle_name',
      placeholder: 'Alex',
      data: {},
      label: 'Middle Name',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.last_name',
      placeholder: 'Doe',
      required: true,
      required_message: 'Please enter a last name',
      data: {},
      label: 'Last Name',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.phone',
      placeholder: '571-123-4567',
      required: true,
      required_message: 'Please enter a phone number.',
      data: {},
      label: 'Phone',
      id: 'inputphone4',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.email',
      placeholder: 'example@gmail.com',
      required: false,
      required_message: 'Please enter your email.',
      data: {},
      label: 'Email',
      id: '',
    },

    {
      type: 'text',
      name_of_json_field: 'guardian_one.address.street',
      placeholder: '1234 Main St',
      required: true,
      required_message: 'Please enter your street address.',
      label: 'Street',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.address.address_line_2',
      placeholder: 'Apt 304',
      required: false,
      required_message: '',
      data: {},
      label: 'Address Line 2 (optional)',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.address.city',
      placeholder: 'Alexandria',
      required: true,
      required_message: 'Please enter a city',
      data: {},
      label: 'City',
      id: 'inputCity',
    },
    {
      type: 'select',
      name_of_json_field: 'guardian_one.address.state',
      placeholder: 'State',
      required: true,
      required_message: 'Please select a state',
      data: states,
      label: 'State',
      id: 'inputState',
    },
    {
      type: 'text',
      name_of_json_field: 'guardian_one.address.zip',
      placeholder: '22305',
      required: true,
      required_message: '',
      data: {},
      label: 'Zip',
      id: 'inputZip',
    },
    {
      type: 'radio',
      label: 'Can receive messages?',
      hasMoreFields: false,
      name_of_json_field: 'guardian_one.can_recieve_messages',

      data: [
        {
          id: 'guardianOneMessages1',
          value: true,
          name_of_json_field: 'guardian_one.can_recieve_messages',
          label: 'Yes',
        },
        {
          id: 'guardianOneMessages2',
          value: false,
          name_of_json_field: 'guardian_one.can_recieve_messages',
          label: 'No',
        },
      ],
    },
  ],
};

export default GuardianOne;
