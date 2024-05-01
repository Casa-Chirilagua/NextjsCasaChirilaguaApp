
/**
 * Generates new guardian two data from the data provided.
 * 
 * @param {*} newGuardianTwo 
 * @param {*} data 
 * @returns 
 */
function HandleNewGuardianTwoData(newGuardianTwo, data) {
  const fd = new FormData();

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

    // fd.append(
    //   'name',
    //   data.guardian_two_first_name +
    //     ' ' +
    //     data.guardian_two_middle_name +
    //     ' ' +
    //     data.guardian_two_last_name,
    // );
    // fd.append('first_name', data.guardian_two_first_name);
    // fd.append('middle_name', data.guardian_two_middle_name);
    // fd.append('last_name', data.guardian_two_last_name);
    // fd.append('phone', data.guardian_two_phone);
    // fd.append('email', data.guardian_two_email);
    // fd.append('address', JSON.stringify(guardianTwoAddress));
    // fd.append('can_receive_text', data.guardian_two_can_recieve_messages);
    // fd.append('profile_image', data.guardian_two_profile_picture[0]);
    

    return parent2Data;
  }
}
export default HandleNewGuardianTwoData;
