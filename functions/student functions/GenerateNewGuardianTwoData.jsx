
/**
 * Generates new guardian two data from the data provided.
 * 
 * @param {*} newGuardianTwo 
 * @param {*} data 
 * @returns 
 */
function GenerateNewGuardianTwoData(newGuardianTwo, data) {

  if (newGuardianTwo) {
    const guardianTwoAddress = {
      street: data.guardian_two_street,
      address_line_two: data.guardian_two_adress_line_2,
      city: data.guardian_two_city,
      state: data.guardian_two_state,
      zip: data.guardian_two_zip,
    };
    const parent2Data = {
      name: data.guardian_two_first_name + ' ' + data.guardian_two_last_name,
      first_name: data.guardian_two_first_name,
      middle_name: data.guardian_two_middle_name,
      last_name: data.guardian_two_last_name,
      phone: data.guardian_two_phone,
      email: data.guardian_two_email,
      address: guardianTwoAddress,
      can_receive_text: data.guardian_two_can_recieve_messages,
    };

    return parent2Data;
  }
}
export default GenerateNewGuardianTwoData;
