const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/parents`;


/**
 * Register the parent
 * 
 * @param {*} parentData 
 * @returns 
 */
const registerParent = async (parentData) => {
  try {
    const response = await post(API_URL, parentData);
    return response.json();
  } catch (error) {
    throw new Error("Error adding parent");
  }
};

/**
 * Fetch the Parent Profile by ID
 * 
 * @param {*} id 
 * @returns 
 */
const fetchParentById = async (id) => {
  const response = await fetch(API_URL + "/" + id);
  return response.json();
};

/**
 * Fetch the parent Profile image by ID
 * 
 * @param {*} id 
 * @returns 
 */
const fetchParentProfileImageById = async (id) => {
  const response = await fetch(API_URL + "/profile_image/" + id);
  return response.json();
};

/**
 * Update the parent by ID
 * 
 * @param {*} data 
 * @returns 
 */
const updateParentById = async (data) => {
  console.log(data);
  const response = await patch(API_URL + "/" + data.id, data.updatedFields);
  return response.json();
};


/**
 * Delete the parent by ID
 * 
 * @param {*} id 
 * @returns 
 */
const deleteParentById = async (id) => {
  const response = await delete(API_URL + "/" + id);
  return response.json();
};


const parentService = {
  registerParent,
  fetchParentById,
  updateParentById,
  fetchParentProfileImageById,
  updateParentById,
  deleteParentById,
};

export default parentService;