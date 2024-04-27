function HandleName(object) {
  let fullName;
  if (object.first_name && object.middle_name && object.last_name) {
    fullName =
      object.first_name + ' ' + object.middle_name + ' ' + object.last_name;
    return fullName;
  } else if (object.first_name && object.last_name) {
    fullName = object.first_name + ' ' + object.last_name;
    return fullName;
  } else if (object.first_name) {
    fullName = object.first_name;
    return fullName;
  } else if (object.name) {
    fullName = object.name;
    return fullName;
  } else if (object.family_name) {
    fullName = object.family_name;
    return fullName;
  } else {
    fullName = '';
    return fullName;
  }
}

export default HandleName;
