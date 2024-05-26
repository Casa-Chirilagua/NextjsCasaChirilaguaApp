const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/families`;

/**
 * Fetch all families
 *
 * @returns All families
 */
const fetchFamilies = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

/**
 * search for families by search query
 */
const searchFamilies = async (query) => {
  const res = await fetch(API_URL + "/search?" + query);
  return res.json();
};
const familiesService = {
  fetchFamilies,
  searchFamilies,
};

export default familiesService;
