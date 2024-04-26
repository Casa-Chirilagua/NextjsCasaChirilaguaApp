const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/programs`;

/**
 * Fetch all Programs
 * 
 * @returns Programs object
 */
const fetchPrograms= async () => {
  const res = await get(API_URL);
  return res.data;
};

/**
 * Fetch Programs by student id
 * 
 * @param {*} id 
 * @returns 
 */
const fetchProgramsByStudentId = async (id) => {
  const res = await get(API_URL + "/studentId/" + id);
  return res.data;
};


const studentsService = {
  fetchPrograms,
  fetchProgramsByStudentId,
};

export default studentsService;