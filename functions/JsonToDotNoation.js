
/**
 * 
 * Converts a JSON object to a dot notation object
 * 
 * Example:
 *         {
 *          "name": "John",
 *          "address": 
 *                    {
 *                      "street": "1234 Main St",
 *                      "city": "Arlington",
 *                      "state": "VA",
 *                      "zip": "22222"
 *                    }    
 *          }    
 *          
 *         becomes,
 *          {
 *              "name": "John",
 *              "address.street": "1234 Main
 *              "address.city": "Arlington",
 *              "address.state": "VA",
 *              "address.zip": "22222"
 *          }  
 * 
 * @param {*} data 
 * @param {*} prefix 
 * @returns 
 */
export function JsonToDotNotation(data, prefix = '') {
    let result = {};
    
    for (let key in data) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        const nestedData = JsonToDotNotation(data[key], `${prefix}${key}.`);
        result = { ...result, ...nestedData };
      } else {
        result[`${prefix}${key}`] = data[key];
      }
    }

    return result;
  }