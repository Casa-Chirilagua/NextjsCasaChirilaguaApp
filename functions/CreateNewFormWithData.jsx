
//Component
import Form from '@/components/form/Form';

//Unique ID
import { v4 as uuidv4 } from 'uuid';


/**
 * Creates a new form with the form Data provided.
 * 
 * 
 * @param {*} formData 
 * @param {*} register 
 * @param {*} control 
 * @param {*} errors 
 * @returns 
 */
function CreateNewFormWithData(formData, register, control, errors) {
  let components;

  
  if (formData && formData.fields) {
    components = (
        <Form
          classN="form-container-modalv2"
          key={uuidv4()}
          formData={formData ? formData : {}}
          register={register}
          control={control}
          errors={errors}
        />
    );
  } else {
    components = <p>Unable to edit field</p>; // You can customize this message
  }
  return components;
}

export default CreateNewFormWithData;
