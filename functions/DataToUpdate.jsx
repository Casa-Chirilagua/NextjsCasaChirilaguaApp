function DataToUpdate(fieldData, fieldName, id, objName, data) {
  /**
   * Represents the data stored in the `fieldData` variable.
   * @type {any}
   */
  const fieldDataCopy = fieldData;
  console.log(fieldName);
  try {
    let result;
    if (!fieldDataCopy.hasObject) {
      result = {
        id: id,
        updatedFields: { [fieldName]: data[fieldDataCopy.name_of_json_field] },
      };
    } else {
      result = {
        id: id,
        updatedFields: {
          [objName]: { [fieldName]: data[fieldDataCopy.name_of_json_field] },
        },
      };
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

export default DataToUpdate;
