const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/students`;

/**
 * 
 * Fetch all Students
 * 
 * @param {*} options 
 * @returns All students
 */
const fetchStudents = async () => {
  const res = await fetch(API_URL);

  // if(!res.ok) {
  //   throw new Error("Failed to fetch students");
  // }

  console.log(res);
  return res.json();
};

/**
 * fetch request to fetch all students with only their names
 * 
 * 
 * @returns All students with only their names
 */
const fetchStudentsWithName = async () => {
  const res = await fetch(API_URL + "/names");
  // if(!res.ok) {
  //   throw new Error("Failed to fetch students");
  // }
  return res.json();
};

/**
 * Fetch all students in a specific program
 * 
 * @param {*} id 
 * @returns All students in a specific program
 */
const fetchStudentsByProgramId = async (id) => { F
  const res = await fetch(API_URL + "/programId/" + id);
  return res.json();
};

/**
 * Fetch all students in a specific family
 * 
 * @param {*} id 
 * @returns 
 */
const fetchStudentsByFamilyId = async (id) => {
  const res = await fetch(API_URL + "/familyId/" + id);
  return res.json();
};

/**
 * Fetch all students with a specific parent id
 * 
 * @param {*} id 
 * @returns all students with a specific parent id
 */
const fetchStudentsByParentId = async (id) => {
  const res = await fetch(API_URL + "/parentId/" + id);
  return res.json();
};



const studentsService = {
  fetchStudentsByParentId,
  fetchStudents,
  fetchStudentsByProgramId,
  fetchStudentsByFamilyId,
  fetchStudentsWithName,
};

export default studentsService;