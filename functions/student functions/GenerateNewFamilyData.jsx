
import HandleName from '../HandleName';

const handleFamilyName = (data) => {
  const guardian_one_full_name = HandleName(data.guardian_one);
  const guardian_two_full_name = HandleName(data.guardian_two);
  return guardian_one_full_name + ' & ' + guardian_two_full_name + "'s Household";
}

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

  const family = {
    family_name: handleFamilyName(data),
    primary_address: data.guardian_one.address, 
    primary_email: data.guardian_one.email,
    primary_phone: data.guardian_one.phone,
    parents: parents, // Convert parents to a string
    students: student,
  };

  return family;
}

export default HandleNewFamilyData;