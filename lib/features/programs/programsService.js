const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/programs`;

/**
 * Fetch all Programs
 * 
 * @returns Programs object
 */
const fetchPrograms= async () => {
  const res = await fetch(API_URL);
  return res.json();
};

/**
 * Fetch Programs by student id
 * 
 * @param {*} id 
 * @returns 
 */
const fetchProgramsByStudentId = async (id) => {
  const res = await fetch(API_URL + "/studentId/" + id);
  return res.json();
};


const studentsService = {
  fetchPrograms,
  fetchProgramsByStudentId,
};

export default studentsService;