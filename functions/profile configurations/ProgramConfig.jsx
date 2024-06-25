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
        form_data: GetItemByJsonFieldName("name", Program),
        can_edit: true,
      },
      Description: {
        value: program?.description ? program.description : '',
        name_of_json_field: 'description',
        form_data: GetItemByJsonFieldName("description", Program),
        can_edit: true,
      },
      'Start Date': {
        value: program.start_date ? program.start_date : '',
        name_of_json_field: 'start_date',
        form_data: GetItemByJsonFieldName("start_date", Program),
        can_edit: true,
      },
      Cost: {
        value: program.cost ? program.cost : '',
        name_of_json_field: 'cost',
        form_data: GetItemByJsonFieldName("cost", Program),
        can_edit: true,
      },
      'Students Enrolled': {
        value: program.students ? program.students.length : '0',
        name_of_json_field: 'student_enrolled',
        form_data: GetItemByJsonFieldName("student_enrolled", Program),
        can_edit: false,
      },
    },
    Capacity: {
      'Volunteer Capacity': {
        value: program?.volunteer_capacity ? program.volunteer_capacity : '',
        name_of_json_field: 'volunteer_capacity',
        form_data: GetItemByJsonFieldName("volunteer_capacity", Program),
        can_edit: true,
      },
      'Program Capacity': {
        value: program?.program_capacity ? program.program_capacity : '',
        name_of_json_field: 'program_capacity',
        form_data: GetItemByJsonFieldName("program_capacity", Program),
        can_edit: true,
      },
    },
    'Additional Information': {
      When: {
        value: program?.when ? program.when : '',
        name_of_json_field: 'when',
        form_data: GetItemByJsonFieldName("when", Program),
        can_edit: true,
      },
      Commitment: {
        value: program.commitment ? program.commitment : '',
        name_of_json_field: 'commitment',
        form_data: GetItemByJsonFieldName("commitment", Program),
        can_edit: true,
      },
      Location: {
        value: program?.location ? program.location : '',
        name_of_json_field: 'location',
        form_data: GetItemByJsonFieldName("location", Program),
        can_edit: true,
      },
      Responsibility: {
        value: program?.responsibility ? program.responsibility : '',
        name_of_json_field: 'responsibility',
        form_data: GetItemByJsonFieldName("responsibility", Program),
        can_edit: true,
      },
      'Additional Notes': {
        value: program?.additional_notes ? program.additional_notes : '',
        name_of_json_field: 'additional_notes',
        form_data: GetItemByJsonFieldName("additional_notes", Program),
        can_edit: true,
      },
      Training: {
        value: program?.training ? program.training : '',
        name_of_json_field: 'training',
        form_data: GetItemByJsonFieldName("training", Program),
        can_edit: true,
      },
    },
  };
  return fields;
}

export default ProgramConfig;
