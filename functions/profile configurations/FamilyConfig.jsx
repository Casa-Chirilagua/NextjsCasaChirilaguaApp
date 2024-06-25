

function FamilyConfig(family) {

  const fields = {
    'Family Information': {
      Name: {
        value: family?.family_name? family.family_name: '',
        name_of_json_field: 'family_name',
        can_edit: false,
      },
      Email: {
        value: family?.primary_email? family.primary_email: '',
        name_of_json_field: 'primary_email',
        can_edit: false,
      },
      Phone: {
        value: family?.primary_phone? family.primary_phone: '',
        name_of_json_field: 'primary_phone',
        can_edit: false,
      },
      'Date Created': {
        value: family?.createdAt? family.createdAt: '',
        name_of_json_field: 'createdAt',
        can_edit: false,
      },
    },
    Address: {
      Street: {
        value: family?.primary_address?.street? family.primary_address.street: '',
        name_of_json_field: 'street',
        can_edit: false,
      },
      City: {
        value: family?.primary_address?.city? family.primary_address.city: '',
        name_of_json_field: 'city',
        can_edit: false,
      },
      State: {
        value: family?.primary_address?.state? family.primary_address.state: '',
        name_of_json_field: 'state',
        can_edit: false,
      },
      Zip: {
        value: family?.primary_address?.zip? family.primary_address.zip: '',
        name_of_json_field: 'zip',
        can_edit: false,
      },
    },
  };
  return fields;
}

export default FamilyConfig;
