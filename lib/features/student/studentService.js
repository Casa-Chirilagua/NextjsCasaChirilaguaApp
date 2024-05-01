const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/students`;

/**
 * Post request to register a student
 *
 * @param {*} studentsData
 * @returns student object
 */
const registerStudent = async (studentsData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentsData)
  });
  return response.json();
};

/**
 * Fetch student by id
 *
 * @param {*} id
 * @returns student object
 */
const fetchStudentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

/**
 * Update student by id
 *
 * @returns student object
 */
const updateStudentById = async (data) => {
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
 * Delete student by id
 *
 * @param {*} id
 * @returns status message
 */
const deleteStudentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

const studentService = {
  registerStudent,
  updateStudentById,
  fetchStudentById,
  deleteStudentById
};

export default studentService;