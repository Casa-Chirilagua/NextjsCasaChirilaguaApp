
import HandleName from "../HandleName";
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

  const fullName = HandleName(data);
  
  const {guardian_one, guardian_two, ...studentData} = data;
  const student = {
    name: fullName,
    ...studentData,
    parents: [parent1Id, parent2Id], // Convert parents to a string
    programs: programIds, // Convert programs to a string
  };

  return student;
}

export default HandleStudentData;
