/**
 *
 * @param {*} objectType
 * @param {*} objectId
 * @param {*} objectIdToAdd
 * @returns The data
 */
function GenerateUpdateData(objectType, objectId, objectIdToAdd) {
  let updatedFields;
  if (objectType === 'Parents') {
    updatedFields = { parents: objectIdToAdd };
  } else if (objectType === 'Programs') {
    updatedFields = { programs: objectIdToAdd };
  } else if (objectType === 'Families') {
    updatedFields = { families: objectIdToAdd };
  } else if (objectType === 'Students') {
    updatedFields = { students: objectIdToAdd };
  }
  const data = {
    id: objectId,
    updatedFields: updatedFields,
  };
  return data;
}

export default GenerateUpdateData;
