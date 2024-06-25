const MedicalInformation = {

  fields: [
    { type: 'section', label: 'Medical Information' },
    {
      type: 'radio',
      label: 'Does the student have allergies?',
      hasMoreFields: false,
      name_of_json_field: 'medical_information.has_allergies',

      data: [
        {
          id: 'allergies1',
          value: true,
          name_of_json_field: 'medical_information.has_allergies',
          label: 'Yes',
        },
        {
          id: 'allergies2',
          value: false,
          name_of_json_field: 'medical_information.has_allergies',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'allergyText1',
      row: '3',
      name_of_json_field: 'medical_information.allergy_description',
      description: 'If you answered yes please provide an explaination',
    },
    {
      type: 'radio',
      label: 'Does the student have Epilepsy? (optional)',
      hasMoreFields: false,
      name_of_json_field: 'medical_information.has_epilepsy',
      data: [
        {
          id: 'epilepsy1',
          value: true,
          name_of_json_field: 'medical_information.has_epilepsy',
          label: 'Yes',
        },
        {
          id: 'epilepsy2',
          value: false,
          name_of_json_field: 'medical_information.has_epilepsy',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'epilepsyText1',
      rows: '3',
      name_of_json_field: 'medical_information.epilepsy_description',
      description: 'If you answered yes please provide an explanation',
      label: '',
      hasLabel: false,
    },
    {
      type: 'radio',
      label: 'Does the student have Asthma? (optional)',
      name_of_json_field: 'medical_information.has_asthma',
      hasMoreFields: false,
      data: [
        {
          id: 'asthma1',
          value: true,
          name_of_json_field: 'medical_information.has_asthma',
          label: 'Yes',
        },
        {
          id: 'asthma2',
          value: false,
          name_of_json_field: 'medical_information.has_asthma',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'asthmaText1',
      rows: '3',
      name_of_json_field: 'medical_information.asthma_description',
      description: 'If you answered yes please provide an explanation',
      hasLabel: false,
      label: '',
    },
    {
      type: 'radio',
      label: 'Does the student have any food restrictions? (optional)',
      hasMoreFields: false,
      name_of_json_field: 'medical_information.has_food_restrictions',

      data: [
        {
          id: 'foodRestriction1',
          value: true,
          name_of_json_field: 'medical_information.has_food_restrictions',
          label: 'Yes',
        },
        {
          id: 'foodRestriction2',
          value: false,
          name_of_json_field: 'medical_information.has_food_restrictions',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'foodRestrictionText1',
      rows: '3',
      name_of_json_field: 'medical_information.food_description',
      description: 'If you answered yes please provide an explanation',
      label: '',
      hasLabel: false,
    },
    {
      type: 'radio',
      label: 'Does the student have other restrictions? (optional)',
      hasMoreFields: false,
      name_of_json_field: 'medical_information.has_other_restrictions',

      data: [
        {
          id: 'otherRestrictions1',
          value: true,
          name_of_json_field: 'medical_information.has_other_restrictions',
          label: 'Yes',
        },
        {
          id: 'otherRestrictions2',
          value: false,
          name_of_json_field: 'medical_information.has_other_restrictions',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'otherRestrictionsText1',
      rows: '3',
      name_of_json_field: 'medical_information.other_restrictions_description',
      description: 'If you answered yes please provide an explanation',
      hasLabel: false,
      label: '',
    },
  ],
};

export default MedicalInformation;
