
/**
 * Looks for a field in the dataToBeSearched object that has a 
 * name_of_json_field property that matches the jsonFieldName parameter.
 * 
 * @param {*} jsonFieldName 
 * @param {*} dataToBeSearched 
 * @returns 
 */
function GetItemByJsonFieldName(jsonFieldName, dataToBeSearched) {
  
  const field = dataToBeSearched.fields.find(field => field.name_of_json_field === jsonFieldName);

  if (field) {
    return { fields: [field] };
  } else {
    return null;
  }
}

export default GetItemByJsonFieldName;