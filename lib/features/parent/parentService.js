const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/parents`;

/**
 * Register the parent
 * 
 * @param {*} parentData 
 * @returns response as JSON
 */
const registerParent = async (parentData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parentData)
    });
    return response.json();
  } catch (error) {
    throw new Error("Error adding parent");
  }
};

/**
 * Fetch the Parent Profile by ID
 * 
 * @param {*} id 
 * @returns parent object
 */
const fetchParentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

/**
 * Fetch the parent Profile image by ID
 * 
 * @param {*} id 
 * @returns image data
 */
const fetchParentProfileImageById = async (id) => {
  const response = await fetch(`${API_URL}/profile_image/${id}`);
  return response.json();
};

/**
 * Update the parent by ID
 * 
 * @param {*} data 
 * @returns updated parent object
 */
const updateParentById = async (data) => {
  console.log(data);
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
 * Delete the parent by ID
 * 
 * @param {*} id 
 * @returns status message
 */
const deleteParentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

const parentService = {
  registerParent,
  fetchParentById,
  fetchParentProfileImageById,
  updateParentById,
  deleteParentById
};

export default parentService;
