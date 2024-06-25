import { JsonToDotNotation } from "./JsonToDotNoation";

function DataToUpdate(data, id, fieldData) {
  const fieldNameToUpdate = fieldData.name_of_json_field;
  const result = JsonToDotNotation(data);
  return {id: id, updatedFields: { [fieldNameToUpdate]: result[fieldNameToUpdate]}};
}

export default DataToUpdate;
