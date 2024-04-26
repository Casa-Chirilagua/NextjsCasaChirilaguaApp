
const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/parents`;

/**
 * Fetch all parents
 * 
 * @returns parents
 */
const fetchParents = async () => {
  const res = await get(API_URL);
  return res.data;
};


/**
 * Fetch all Parents with only their names
 * 
 * @returns Parents with only their names
 */
const fetchParentsWithName = async () => {
  const res = await get(API_URL + '/names');
  return res.data;
};

/**
 * Fetch all parents of a specific student
 * 
 */
const fetchParentsByStudentId = async (id) => {
  const res = await get(API_URL + '/studentId/' + id);
  return res.data;
};

/**
 * Fetch all parents of a specific family
 * 
 * @param {*} id 
 * @returns parent of a specific family
 */
const fetchParentsByFamilyId = async (id) => {
  const res = await get(API_URL + '/familyId/' + id);
  return res.data;
};

const parentService = {
  fetchParentsByStudentId,
  fetchParents,
  fetchParentsWithName,
  fetchParentsByFamilyId,
};

export default parentService;
