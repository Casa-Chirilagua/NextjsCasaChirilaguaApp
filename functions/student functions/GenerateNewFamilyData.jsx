import React from 'react';


/**
 * Generates new family data from the data provided.
 * 
 * 
 * @param {*} data contains the data for the family
 * @param {*} parents contains parent information
 * @param {*} student contains student information
 * @returns 
 */
function HandleNewFamilyData(data, parents, student) {

  let primary_address = {
    street: data.mothers_street,
    address_line_two: data.mothers_address_line_2,
    city: data.mothers_city,
    state: data.state,
    zip: data.mothers_zip,
  };

  const family = {
    family_name:
      data.guardian_one_first_name +
      ' ' +
      data.guardian_one_last_name +
      "'s Household",
    primary_address: primary_address, 
    primary_email: data.guardian_one_email,
    primary_phone: data.guardian_one_phone,
    parents: parents, // Convert parents to a string
    students: student,
  };

  return family;
}

export default HandleNewFamilyData;