import { generateParamStringforPages } from "@/functions/generateParamStringforPages";

const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/parents`;

/**
 * Fetch all parents
 * 
 * @returns parents
 */
const fetchParents = async (data) => {
  const res = await fetch(API_URL + generateParamStringforPages(data));
  return res.json();
};

/**
 * Search for parents by search query
 */
const searchParents = async (query) => {
  const res = await fetch(API_URL + "/search?" + query);
  return res.json();
}

/**
 * Fetch all Parents with only their names
 * 
 * @returns Parents with only their names
 */
const fetchParentsWithName = async () => {
  const res = await fetch(API_URL + '/names');
  return res.json();
};

/**
 * Fetch all parents of a specific student
 * 
 */
const fetchParentsByStudentId = async (id) => {
  const res = await fetch(API_URL + '/studentId/' + id);
  return res.json();
};

/**
 * Fetch all parents of a specific family
 * 
 * @param {*} id 
 * @returns parent of a specific family
 */
const fetchParentsByFamilyId = async (id) => {
  const res = await fetch(API_URL + '/familyId/' + id);
  return res.json();
};

const parentService = {
  fetchParentsByStudentId,
  fetchParents,
  fetchParentsWithName,
  fetchParentsByFamilyId,
  searchParents,
};

export default parentService;
