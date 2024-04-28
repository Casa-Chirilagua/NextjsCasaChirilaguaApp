const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/students`;

 /**
  * 
  * Post request to register a student
  * 
  * @param {*} studentsData 
  * @returns student object
  */
 const registerStudent = async (studentsData) => {
  const res = await post(API_URL, studentsData);
  return res.json();
};

/**
 * Fetch student by id
 * 
 * @param {*} id 
 * @returns student object
 */
const fetchStudentById = async (id) => {
  const res = await fetch(API_URL + '/' + id);
  return res.json();
};


/**
 * Update student by id
 * 
 * @param {*} data 
 * @returns student object
 */
const updateStudentById = async (data) => {
  const res = await patch(
    API_URL + '/' + data.id,
    data.updatedFields,
  );
  return res.json();
};

/**
 * Delete student by id
 * 
 * @param {*} id 
 * @returns status message
 */
const deleteStudentById = async (id) => {
  const res = await delete(API_URL + '/' + id);
  return res.json();
};


const studentService = {
  registerStudent,
  updateStudentById,
  fetchStudentById,
  deleteStudentById,
};

export default studentService;
