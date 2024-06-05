import states from '../States';
import grades from '../Grades';
const StudentInformation = {
  fields: [
    { type: 'section', label: 'Student Information' },
    {
      type: 'text',
      name_of_json_field: 'first_name',
      placeholder: 'Enter First Name',
      required: true,
      required_message: 'Please enter a first name',
      data: {},
      label: 'First Name',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'middle_name',
      placeholder: 'Enter Midddle Name',
      required: false,
      data: {},
      label: 'Middle Name (optional)',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'last_name',
      placeholder: 'Enter Last Name',
      required: true,
      required_message: 'Please enter a last name',
      data: {},
      label: 'Last Name',
      id: '',
    },
    {
      type: 'phone',
      name_of_json_field: 'phone',
      placeholder: 'Enter Mobile Phone',
      required: true,
      required_message: 'Please enter a phone number.',
      data: {},
      label: 'Mobile Phone',
      id: 'inputphone4',
    },

    {
      type: 'date',
      name_of_json_field: 'date_of_birth',
      placeholder: 'Enter Date of Birth',
      required: true,
      required_message: 'Please select your date of birth.',
      data: {},
      label: 'Date of Birth',
      id: '',
    },
    {
      type: 'text',
      name_of_json_field: 'street',
      placeholder: '1234 Main St',
      required: true,
      required_message: 'Please enter your street address.',
      data: {},
      label: 'Street',
      id: '',
    },

    {
      type: 'text',
      name_of_json_field: 'address_line_2',
      placeholder: 'Apartment, studio, floor',
      required: false,
      required_message: '', // Not applicable for non-required fields
      data: {},
      label: 'Address Line 2',
      id: '',
    },

    {
      type: 'text',
      name_of_json_field: 'city',
      placeholder: 'City',
      required: true,
      required_message: 'Please enter a city',
      data: {},
      label: 'City',
      id: 'inputCity',
    },
    {
      type: 'select',
      name_of_json_field: 'state',
      placeholder: 'State',
      required: true,
      required_message: 'Please select a state',
      data: states,
      label: 'State',
      id: 'inputState',
    },
    {
      type: 'text',
      name_of_json_field: 'zip',
      placeholder: 'Zip Code',
      required: true,
      required_message: 'Please enter a city',
      data: {},
      label: 'Zip Code',
      id: 'inputCity',
    },
    {
      type: 'text',
      name_of_json_field: 'email',
      placeholder: 'Email',
      required: false,
      required_message: 'Please enter your email.',
      data: {},
      label: 'Email (optional)',
      id: '',
    },

    {
      type: 'select',
      name_of_json_field: 'grade',
      placeholder: 'Grade',
      required: true,
      required_message: '', // The message can be left empty for select fields
      data: grades,
      label: 'Grade',
      id: 'inputGrade',
    },
    {
      type: 'select',
      name_of_json_field: 'gender',
      placeholder: 'Gender',
      required: true,
      required_message: '', // The message can be left empty for select fields
      data: [{ name: 'Male' }, { name: 'Female' }],
      label: 'Gender',
      id: 'inputGrade',
    },
    {
      type: 'text',
      name_of_json_field: 'school',
      placeholder: 'School',
      required: true,
      required_message: 'Please enter a school.',
      data: {},
      label: 'School',
      id: '',
    },
    {
      type: 'radio',
      label: 'Does the student get free or reduced lunch? (optional)',
      data: [
        {
          id: 'ReducedLunch1',
          value: true,
          name_of_json_field: 'free_and_reduced_lunch',
          label: 'Yes',
        },
        {
          id: 'ReducedLunch2',
          value: false,
          name_of_json_field: 'free_and_reduced_lunch',
          label: 'No',
        },
      ],
    },

    
    
    
  ],
};

export default StudentInformation;
