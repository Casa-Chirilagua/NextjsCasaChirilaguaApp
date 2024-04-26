
const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}families`;


/**
 * 
 * Post request to register a family
 * 
 * @param {*} familyData 
 * @returns registered family object
 */
const registerFamily = async (familyData) => {
  const res = await post(API_URL, familyData);
  return res.data;
};


/**
 * Fetch family by id
 * 
 * @param {*} id 
 * @returns family  
 */
const fetchFamilyById = async (id) => {
  const res = await get(API_URL + '/' + id);
  return res.data;
};


/**
 * Update family by id
 * 
 * @param {*} data 
 * @returns 
 */
const updateFamilyById = async (data) => {
  const res = await patch(
    API_URL + '/' + data.id,
    data.updatedFields,
  );
  return res.data;
};

/**
 * Delete family by id
 * 
 * @param {*} id 
 * @returns 
 */
const deleteFamilyById = async (id) => {
  const res = await delete(API_URL + '/' + id);
  return res.data;
};


const studentService = {
  registerFamily,
  fetchFamilyById,
  updateFamilyById,
  deleteFamilyById,
};

export default studentService;
