const MedicalInsurance = {
  fields: [
    { type: "section", label: "Medical Insurance" },
    {
      type: "text",
      id: "policyNumber",
      name_of_json_field: "health_care.policy_number",
      placeholder: "123456789",
      label: "Policy Number",
    },
    {
      type: "text",
      id: "doctorsFirstName",
      name_of_json_field: "health_care.doctor_first_name",
      placeholder: "Enter First Name",
      label: "Doctor's First Name",
    },
    {
      type: "text",
      id: "doctorsLastName",
      name_of_json_field: "health_care.doctor_last_name",
      placeholder: "Enter Last Name",
      label: "Doctor's Last Name",
    },
    {
      type: "phone",
      id: "doctorsPhone",
      name_of_json_field: "health_care.phone",
      placeholder: "Enter Phone Number",
      label: "Doctors Phone Number",
    },
  ],
};

export default MedicalInsurance;
