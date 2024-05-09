const MedicalInsurance = {
    title: 'Medical Insurance',
    hasMoreFields: false,
    name: 'medicalInsurance',
    fields: [
      {
        type: 'text',
        id: 'policyNumber',
        name_of_json_field: 'policy_number',
        placeholder: 'Enter Policy Number',
        label: 'Policy Number (optional)',
      },
      {
        type: 'text',
        id: 'doctorsFirstName',
        name_of_json_field: 'first_name',
        placeholder: 'Enter First Name',
        label: "Doctor's First Name (optional)",
      },
      {
        type: 'text',
        id: 'doctorsLastName',
        name_of_json_field: 'last_name',
        placeholder: 'Enter Last Name',
        label: "Doctor's Last Name (optional)",
      },
      {
        type: 'phone',
        id: 'doctorsPhone',
        name_of_json_field: 'doctors_phone',
        placeholder: 'Enter Phone Number',
        label: 'Doctors Phone Number (optional)',
      },
    ],
  };

export default MedicalInsurance;