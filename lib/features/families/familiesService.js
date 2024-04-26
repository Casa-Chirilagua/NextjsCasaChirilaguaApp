
const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/families`;


/**
 * Fetch all families
 * 
 * @returns All families
 */
const fetchFamilies = async () => {
  const res = await get(API_URL);
  return res.data;
};

const familiesService = {
  fetchFamilies,
};

export default familiesService;
