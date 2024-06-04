

import HandleName from "../HandleName";
/**
 * Generats new the first guardian data from the data provided.
 * 
 * @param {*} newGuardianOne 
 * @param {*} data 
 * @returns 
 */
function GenerateNewGuardianOneData(data) {

const fullName = HandleName({ first_name: data.guardian_one_first_name ? data.guardian_one_first_name : "", middle_name: data.guardian_one_middle_name ? data.guardian_one_middle_name : "", last_name: data.guardian_one_last_name ? data.guardian_one_last_name : "" });

  let guardainOneAddress = {
    street: data?.mothers_street? data.mothers_street : "",
    address_line_two: data?.mothers_address_line_2? data.mothers_address_line_2 : "",
    city: data?.mothers_city? data?.mothers_city : "",
    state: data?.state? data.state : "",
    zip: data?.mothers_zip? data.mothers_zip : "",
  };

  const parent1Data = {
    name: fullName,
    first_name: data?.guardian_one_first_name? data.guardian_one_first_name : "",
    middle_name: data?.guardian_one_middle_name? data.guardian_one_middle_name : "",
    last_name: data?.guardian_one_last_name? data.guardian_one_last_name : "",
    phone: data?.guardian_one_phone? data.guardian_one_phone : "",
    email: data?.guardian_one_email? data.guardian_one_email : "",
    address: guardainOneAddress,
    can_receive_text: data.guardian_one_can_recieve_messages? data.guardian_one_can_recieve_messages : false,
  };



  return parent1Data;

}

export default GenerateNewGuardianOneData;
