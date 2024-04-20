const MedicalInformation = {
  title: 'Medical Information',
  hasMoreFields: true,
  fields: [
    {
      type: 'radio',
      label: 'DOES THE STUDENT HAVE ALLERGIES?',
      hasMoreFields: false,
      data: [
        {
          id: 'allergies1',
          value: true,
          name_of_json_field: 'has_allergies',
          label: 'Yes',
        },
        {
          id: 'allergies2',
          value: false,
          name_of_json_field: 'has_allergies',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'allergyText1',
      row: '3',
      name_of_json_field: 'allergy comment',
      description: 'If you answered yes please provide an explaination',
    },
    {
      type: 'radio',
      label: 'DOES THE STUDENT HAVE EPILEPSY?',
      hasMoreFields: false,
      data: [
        {
          id: 'epilepsy1',
          value: true,
          name_of_json_field: 'has_epilepsy',
          label: 'Yes',
        },
        {
          id: 'epilepsy2',
          value: false,
          name_of_json_field: 'has_epilepsy',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'epilepsyText1',
      rows: '3',
      name_of_json_field: 'epilepsy_comment',
      description: 'If you answered yes please provide an explanation',
      label: '',
      hasLabel: false,
    },
    {
      type: 'radio',
      label: 'DOES THE STUDENT HAVE ASTHMA?',
      hasMoreFields: false,
      data: [
        {
          id: 'asthma1',
          value: true,
          name_of_json_field: 'has_asthma',
          label: 'Yes',
        },
        {
          id: 'asthma2',
          value: false,
          name_of_json_field: 'has_asthma',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'asthmaText1',
      rows: '3',
      name_of_json_field: 'asthma_comment',
      description: 'If you answered yes please provide an explanation',
      hasLabel: false,

      label: '',
    },
    {
      type: 'radio',
      label: 'DOES THE STUDENT HAVE ANY FOOD RESTRICTIONS?',
      hasMoreFields: false,
      data: [
        {
          id: 'foodRestriction1',
          value: true,
          name_of_json_field: 'has_food_restriction',
          label: 'Yes',
        },
        {
          id: 'foodRestriction2',
          value: false,
          name_of_json_field: 'has_food_restriction',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'foodRestrictionText1',
      rows: '3',
      name_of_json_field: 'food_restriction_comment',
      description: 'If you answered yes please provide an explanation',
      label: '',
      hasLabel: false,
    },
    {
      type: 'radio',
      label: 'DOES THE STUDENT HAVE OTHER RESTRICTIONS?',
      hasMoreFields: false,
      data: [
        {
          id: 'otherRestrictions1',
          value: true,
          name_of_json_field: 'has_other_restrictions',
          label: 'Yes',
        },
        {
          id: 'otherRestrictions2',
          value: false,
          name_of_json_field: 'has_other_restrictions',
          label: 'No',
        },
      ],
    },
    {
      type: 'textarea',
      id: 'otherRestrictionsText1',
      rows: '3',
      name_of_json_field: 'other_restrictions_comments',
      description: 'If you answered yes please provide an explanation',
      hasLabel: false,
      label: '',
    },
  ],
};

export default MedicalInformation;
