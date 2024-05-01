const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/programs`;

/**
 * Register a program
 *
 * @param {*} programData
 * @returns program object
 */
const registerProgram = async (programData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(programData)
  });
  return response.json();
};

/**
 * Fetch a Program by Id
 *
 * @param {*} id
 * @returns program object
 */
const fetchProgramById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};


/**
 * Update a Program by Id
 *
 * @param {*} data
 * @returns Program Object
 */
const updateProgramById = async (data) => {
  const response = await fetch(`${API_URL}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.updatedFields)
  });
  return response.json();
};

/**
 * Delete a Program by Id
 *
 * @param {*} id
 * @returns status message
 */
const deleteProgramById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

const programServices = {
  registerProgram,
  fetchProgramById,
  updateProgramById,
  deleteProgramById
};

export default programServices;