
/**
 * Generates the new student data from the data provided.
 * 
 * @param {*} data 
 * @param {*} parent1Id 
 * @param {*} parent2Id 
 * @param {*} programIds 
 * @returns 
 */
function HandleStudentData(
  data,
  parent1Id,
  parent2Id,
  programIds,
) {

  const addressArray = {
    street: data.street,
    address_line_2: data.address_line_2,
    city: data.city,
    state: data.state,
    zip: data.zip,
  };

  const emergencyContact = {
    name: data.emergency_first_name + ' ' + data.emergency_last_name,
    phone: data.emergency_phone,
    relationship: data.relationship,
  };

  const medicalInformation = {
    has_allergies: data.has_allergies,
    has_epilepsy: data.has_epilepsy,
    has_asthma: data.has_asthma,
    has_food_restriction: data.has_food_restriction,
    has_other_restrictions: data.has_other_restrictions,
    allergy_description: data.allergy_comment,
    epilepsy_description: data.epilepsy_comment,
    asthma_description: data.asthma_comment,
    food_description: data.food_restriction_comment,
    other_description: data.other_restrictions_comments,
  };

  const healthCare = {
    policy_number: data.policy_number,
    doctor_name: data.doctors_first_name + ' ' + data.doctors_last_name,
    phone: data.doctors_phone,
  };

  const parents = [parent1Id, parent2Id];

  let fullName;
  if(data.first_name && data.middle_name && data.last_name){
    fullName = data.first_name + ' ' + data.middle_name + ' ' + data.last_name;
  }
  else if (data.first_name && data.last_name){
    fullName = data.first_name + ' ' + data.last_name;
  }
  else if (data.first_name){
    fullName = data.first_name;
  }
  else{
    fullName = '';
  }

  const student = {
    name: fullName,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    date_of_birth: data.date_of_birth,
    email: data.email,
    phone: data.phone,
    address: addressArray, // Convert address to a string
    school: data.school,
    grade: data.grade,
    gender: data.gender,
    free_and_reduced_lunch: data.free_and_reduced_lunch,
    enrolled: true,
    emergency_contact: emergencyContact, // Convert emergency_contact to a string
    medical_information: medicalInformation, // Convert medical_information to a string
    health_care: healthCare, // Convert health_care to a string
    parents: parents, // Convert parents to a string
    programs: programIds, // Convert programs to a string
  };

  return student;
}

export default HandleStudentData;
