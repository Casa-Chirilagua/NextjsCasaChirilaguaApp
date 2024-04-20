const ProgramData = {

  fields: [
    { type: 'section', label: 'Program Information',name_of_json_field: 'PI', },
    {
      type: 'text',
      name_of_json_field: 'name',
      placeholder: 'Enter Name',
      required: true,
      required_message: 'Please enter a name',
      data: {},
      label: 'Name',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'description',
      placeholder: 'Enter Description',
      data: {},
      label: 'Description',
      id: '',
    },
    {
      type: 'date',
      name_of_json_field: 'start_date',
      placeholder: 'Select Start Date',
      data: {},
      label: 'Start Date',
      id: '',
    },

    {
      type: 'number',
      name_of_json_field: 'cost',
      placeholder: 'Enter Cost',
      data: {},
      label: 'Cost',
      id: '',
    },
    {
      type: 'number',
      name_of_json_field: 'volunteer_capacity',
      placeholder: 'Enter Volunteer Capacity',
      required: true,
      required_message: 'Please enter a volunteer capacity',
      data: {},
      label: 'Volunteer Capacity',
      id: '',
    },
    {
      type: 'number',
      name_of_json_field: 'program_capacity',
      placeholder: 'Enter Program Capacity',
      required: true,
      required_message: 'Please enter a program capacity',
      data: {},
      label: 'Program Capacity',
      id: '',
    },

    {
      type: 'textarea',
      name_of_json_field: 'when',
      placeholder: 'Enter Meeting Schedule',
      hasLabel: true,
      data: {},
      label: 'When does the club meet?',
      id: '',
    },
    {
      type: 'textarea',
      name_of_json_field: 'commitment',
      placeholder: 'Enter Commitment Details',
      hasLabel: true,
      data: {},
      label: 'Commitment',
      id: '',
    },
    {
      type: 'textarea',
      name_of_json_field: 'location',
      placeholder: 'Enter Location',
      hasLabel: true,

      data: {},
      label: 'Location',
      id: '',
    },
    {
      type: 'textarea',
      name_of_json_field: 'responsibility',
      placeholder: 'Enter Responsibility',
      hasLabel: true,

      data: {},
      label: 'Responsibility',
      id: '',
    },
    {
      type: 'textarea',
      name_of_json_field: 'additional_notes',
      placeholder: 'Enter Additional Notes',
      hasLabel: true,

      data: {},
      label: 'Additional Notes',
      id: '',
    },
    {
      type: 'textarea',
      name_of_json_field: 'training',
      placeholder: 'Enter Training Details',
      hasLabel: true,

      data: {},
      label: 'Training',
      id: '',
    },
  ],
};

export default ProgramData;
