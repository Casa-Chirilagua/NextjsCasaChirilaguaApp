
//Component
import Form from '@/components/form/Form';

//Unique ID
import { v4 as uuidv4 } from 'uuid';

function UpdateComponentData(formData, register, control, errors) {
  let components;
  if (formData && formData.fields) {
    components = (
      <Form
        classN="form-container-modal"
        key={uuidv4()}
        formData={formData}
        register={register}
        control={control}
        errors={errors}
      ></Form>
    );
  } else {
    components = <p>Unable to edit field</p>; // You can customize this message
  }
  return components;
}

export default UpdateComponentData;
