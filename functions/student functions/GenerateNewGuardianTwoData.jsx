import HandleName from "../HandleName";

/**
 * Generates new guardian two data from the data provided.
 * 
 * @param {*} newGuardianTwo 
 * @param {*} data 
 * @returns 
 */
function GenerateNewGuardianTwoData(data) {
  const fullName = HandleName(data?.guardian_two);
  return { name: fullName, ...data?.guardian_two };

}
export default GenerateNewGuardianTwoData;
