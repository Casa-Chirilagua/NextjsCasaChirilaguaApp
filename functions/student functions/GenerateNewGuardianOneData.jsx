

import HandleName from "../HandleName";
/**
 * Generats new the first guardian data from the data provided.
 * 
 * @param {*} newGuardianOne 
 * @param {*} data 
 * @returns 
 */
function GenerateNewGuardianOneData(data) {
  const fullName = HandleName(data?.guardian_one);
  return { name: fullName, ...data?.guardian_one };
}

export default GenerateNewGuardianOneData;
