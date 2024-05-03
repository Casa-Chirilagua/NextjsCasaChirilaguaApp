
function FamilyConfig(family) {

  const fields = {
    'Family Information': {
      Name: {
        value: family.family_name,
        name_of_json_field: 'family_name',
        database_field_name: 'family_name',
        hasObject: false,
      },
      Email: {
        value: family.primary_email,
        name_of_json_field: 'primary_email',
        database_field_name: 'primary_email',
        hasObject: false,
      },
      Phone: {
        value: family.primary_phone,
        name_of_json_field: 'primary_phone',
        database_field_name: 'primary_phone',
        hasObject: false,
      },
      'Date Created': {
        value: family.createdAt,
        name_of_json_field: 'createdAt',
        database_field_name: 'createdAt',
        hasObject: false,
      },
    },
    Address: {
      Street: {
        value: family.primary_address?.street,
        name_of_json_field: 'street',
        database_field_name: 'street',
        hasObject: true,
        objectName: 'primary_address',
      },
      City: {
        value: family.primary_address?.city,
        name_of_json_field: 'city',
        database_field_name: 'city',
        hasObject: true,
        objectName: 'primary_address',
      },
      State: {
        value: family.primary_address?.state,
        name_of_json_field: 'state',
        database_field_name: 'state',
        hasObject: true,
        objectName: 'primary_address',
      },
      Zip: {
        value: family.primary_address?.zip,
        name_of_json_field: 'zip',
        database_field_name: 'zip',
        hasObject: true,
        objectName: 'primary_address',
      },
    },
  };
  return fields;
}

export default FamilyConfig;
