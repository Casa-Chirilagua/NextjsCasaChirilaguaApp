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
        label: 'Policy Number',
      },
      {
        type: 'text',
        id: 'doctorsFirstName',
        name_of_json_field: 'doctors_first_name',
        placeholder: 'Enter First Name',
        label: "Doctor's First Name",
      },
      {
        type: 'text',
        id: 'doctorsLastName',
        name_of_json_field: 'doctors_last_name',
        placeholder: 'Enter Last Name',
        label: "Doctor's Last Name",
      },
      {
        type: 'phone',
        id: 'doctorsPhone',
        name_of_json_field: 'doctors_phone',
        placeholder: 'Enter Phone Number',
        label: 'Doctors Phone Number',
      },
    ],
  };

export default MedicalInsurance;