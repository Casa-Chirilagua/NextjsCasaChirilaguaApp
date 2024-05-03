function ProgramConfig(program) {
  const fields = {
    'Program Information': {
      Name: {
        value: program.name ? program.name : '',
        name_of_json_field: 'name',
        database_field_name: 'name',
        hasObject: false,
      },
      Description: {
        value: program.description ? program.description : '',
        name_of_json_field: 'description',
        database_field_name: 'description',
        hasObject: false,
      },
      'Start Date': {
        value: program.start_date ? program.start_date : '',
        name_of_json_field: 'start_date',
        database_field_name: 'start_date',
        hasObject: false,
      },
      Cost: {
        value: program.cost ? program.cost : '',
        name_of_json_field: 'cost',
        database_field_name: 'cost',
        hasObject: false,
      },
      'Students Enrolled': {
        value: program.students ? program.students.length : '0',
        name_of_json_field: 'student_enrolled',
        database_field_name: 'student_enrolled',
        hasObject: false,
      },
    },
    Capacity: {
      'Volunteer Capacity': {
        value: program.volunteer_capacity ? program.volunteer_capacity : '',
        name_of_json_field: 'volunteer_capacity',
        database_field_name: 'volunteer_capacity',
        hasObject: false,
      },
      'Program Capacity': {
        value: program.program_capacity ? program.program_capacity : '',
        name_of_json_field: 'program_capacity',
        database_field_name: 'program_capacity',
        hasObject: false,
      },
    },
    'Additional Information': {
      When: {
        value: program.when? program.when: '' ,
        name_of_json_field: 'when',
        database_field_name: 'when',
        hasObject: false,
      },
      Commitment: {
        value: program.commitment ? program.commitment: '',
        name_of_json_field: 'commitment',
        database_field_name: 'commitment',
        hasObject: false,
      },
      Location: {
        value: program.location? program.location: '',
        name_of_json_field: 'location',
        database_field_name: 'location',
        hasObject: false,
      },
      Responsibility: {
        value: program.responsibility ?program.responsibility :'',
        name_of_json_field: 'responsibility',
        database_field_name: 'responsibility',
        hasObject: false,
      },
      'Additional Notes': {
        value: program.additional_notes? program.additional_notes :'',
        name_of_json_field: 'additional_notes',
        database_field_name: 'additional_notes',
        hasObject: false,
      },
      Training: {
        value: program.training? program.training: '' ,
        name_of_json_field: 'training',
        database_field_name: 'training',
        hasObject: false,
      },
    },
  };
  return fields;
}

export default ProgramConfig;
