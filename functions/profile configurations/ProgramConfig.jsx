//Functions
import GetItemByJsonFieldName from "../student functions/GetItemByJsonFieldName";

//Data
import Program from '@/data/Program Form Data/Program';


function ProgramConfig(program) {
  const fields = {
    'Program Information': {
      Name: {
        value: program?.name ? program.name : '',
        name_of_json_field: 'name',
        database_field_name: 'name',
        form_data: GetItemByJsonFieldName("name", Program),
        hasObject: false,
      },
      Description: {
        value: program?.description ? program.description : '',
        name_of_json_field: 'description',
        database_field_name: 'description',
        form_data: GetItemByJsonFieldName("description", Program),
        hasObject: false,
      },
      'Start Date': {
        value: program.start_date ? program.start_date : '',
        name_of_json_field: 'start_date',
        database_field_name: 'start_date',
        form_data: GetItemByJsonFieldName("start_date", Program),
        hasObject: false,
      },
      Cost: {
        value: program.cost ? program.cost : '',
        name_of_json_field: 'cost',
        database_field_name: 'cost',
        form_data: GetItemByJsonFieldName("cost", Program),
        hasObject: false,
      },
      'Students Enrolled': {
        value: program.students ? program.students.length : '0',
        name_of_json_field: 'student_enrolled',
        database_field_name: 'student_enrolled',
        form_data: GetItemByJsonFieldName("student_enrolled", Program),
        hasObject: false,
      },
    },
    Capacity: {
      'Volunteer Capacity': {
        value: program?.volunteer_capacity ? program.volunteer_capacity : '',
        name_of_json_field: 'volunteer_capacity',
        database_field_name: 'volunteer_capacity',
        form_data: GetItemByJsonFieldName("volunteer_capacity", Program),
        hasObject: false,
      },
      'Program Capacity': {
        value: program?.program_capacity ? program.program_capacity : '',
        name_of_json_field: 'program_capacity',
        database_field_name: 'program_capacity',
        form_data: GetItemByJsonFieldName("program_capacity", Program),
        hasObject: false,
      },
    },
    'Additional Information': {
      When: {
        value: program?.when? program.when: '' ,
        name_of_json_field: 'when',
        database_field_name: 'when',
        form_data: GetItemByJsonFieldName("when", Program),
        hasObject: false,
      },
      Commitment: {
        value: program.commitment ? program.commitment: '',
        name_of_json_field: 'commitment',
        database_field_name: 'commitment',
        form_data: GetItemByJsonFieldName("commitment", Program),
        hasObject: false,
      },
      Location: {
        value: program?.location? program.location: '',
        name_of_json_field: 'location',
        database_field_name: 'location',
        form_data: GetItemByJsonFieldName("location", Program),
        hasObject: false,
      },
      Responsibility: {
        value: program?.responsibility ?program.responsibility :'',
        name_of_json_field: 'responsibility',
        database_field_name: 'responsibility',
        form_data: GetItemByJsonFieldName("responsibility", Program),
        hasObject: false,
      },
      'Additional Notes': {
        value: program?.additional_notes? program.additional_notes :'',
        name_of_json_field: 'additional_notes',
        database_field_name: 'additional_notes',
        form_data: GetItemByJsonFieldName("additional_notes", Program),
        hasObject: false,
      },
      Training: {
        value: program?.training? program.training: '' ,
        name_of_json_field: 'training',
        database_field_name: 'training',
        form_data: GetItemByJsonFieldName("training", Program),
        hasObject: false,
      },
    },
  };
  return fields;
}

export default ProgramConfig;
