const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/programs`;

/**
 * Register a program
 * 
 * @param {*} studentsData 
 * @returns 
 */
const registerProgram = async (studentsData) => {
  const res = await post(API_URL, studentsData);
  return res.json();
};

/**
 * Fetch a Program by Id
 * 
 * @param {*} id 
 * @returns 
 */
const fetchProgramById = async (id) => {
  const response = await fetch(API_URL + "/" + id);
  return response.json();
};

/**
 * Update a Program by Id
 * 
 * @param {*} data 
 * @returns Program Object
 */
const updateProgramById = async (data) => {
  const response = await patch(API_URL + "/" + data.id, data.updatedFields);
  return response.json();
};


/**
 * Delete a Program by Id
 * 
 * @param {*} id 
 * @returns Status message
 */
const deleteProgramById = async (id) => {
  const response = await delete(API_URL + "/" + id);
  return response.json();
};

const programServices = {
  registerProgram,
  fetchProgramById,
  updateProgramById,
  deleteProgramById,
};

export default programServices;
