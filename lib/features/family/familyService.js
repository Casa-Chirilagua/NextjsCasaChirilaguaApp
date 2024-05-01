const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/families`;

/**
 * Post request to register a family
 *
 * @param {*} familyData 
 * @returns registered family object
 */
const registerFamily = async (familyData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(familyData)
  });
  return response.json();
};

/**
 * Fetch family by id
 *
 * @param {*} id 
 * @returns family object
 */
const fetchFamilyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

/**
 * Update family by id
 *
 * @param {*} data 
 * @returns updated family object
 */
const updateFamilyById = async (data) => {
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
 * Delete family by id
 *
 * @param {*} id 
 * @returns status message
 */
const deleteFamilyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

const familyService = {
  registerFamily,
  fetchFamilyById,
  updateFamilyById,
  deleteFamilyById,
};

export default familyService;
