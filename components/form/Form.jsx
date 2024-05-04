
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

function renderSingleField(field, register, errors, color) {
  const {
    type,
    name_of_json_field,
    placeholder,
    required,
    required_message,
    label,
  } = field;

  const fieldProps = {
    key: uuidv4(),
    className: 'form-control',
    type: type,
    ...register(name_of_json_field, {
      required: required && required_message,
    }),
    placeholder: placeholder,
  };

  return (
    <div className="form-item" key={fieldProps.key}>
      <label style={{color: color}}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input style={{borderColor: color, border: errors[name_of_json_field]? 'solid 0.1rem red':color}}{...fieldProps} />
      {errors[name_of_json_field] && (
        <div className="error-message">
          {errors[name_of_json_field].message}
        </div>
      )}
    </div>
  );
}

function renderFile(field, register, errors, color) {
  const {
    type,
    name_of_json_field,
    placeholder,
    required,
    required_message,
    label,
    name,
  } = field;

  const fieldProps = {
    key: uuidv4(),
    className: 'form-control',
    type: type,
    ...register(name_of_json_field, {
      required: required && required_message,
    }),
    placeholder: placeholder,
  };

  return (
    <div className="form-item" key={fieldProps.key}>
      <label style={{color: color}}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input style={{borderColor: color}} {...fieldProps} name={name}/>
      {errors[name_of_json_field] && (
        <div className="error-message">
          {errors[name_of_json_field].message}
        </div>
      )}
    </div>
  );
}

function renderSelectField(field, register, control, errors, color) {
  const { name_of_json_field, required, label, id, data } = field;

  const fieldProps = {
    control: control,
    key: uuidv4(),
    className: 'form-control',
    name: name_of_json_field,
  };

  return (
    <div className="form-item" key={fieldProps.key}>
      <label style={{color: color}}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <Controller
        {...fieldProps}
        rules={{ required: required }}
        render={({ field }) => (
          <select {...field} id={id} style={{color: color, border:`1px solid ${color}`}} className="form-control">
            <option style={{color: color}} value="">Select</option>
            {data.map((item) => (
              <option key={uuidv4()} value={item.abbreviation}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}

function renderTextArea(field, register, color) {
  let { id, rows, name_of_json_field, description, label, hasLabel } = field;

  return (
    <div className="form-item ">
      {hasLabel && <label style={{color: color}}>{label}</label>}
      <textarea
        className="form-control"
        style={{color: color}}
        id={id}
        row={rows}
        {...register(name_of_json_field)}
      >
      </textarea>
    </div>
  );
}

function renderRadios(field, register, errors, required, color) {
  const { label, type, data } = field;
  return (
    <>
      <h6  style={{color: color}} className="">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </h6>
      {data.map((item) => {
        const { id, value, name_of_json_field, label } = item;
        const fieldProps = {
          key: uuidv4(),
          className: 'form-check-input',
          type: type,
          ...register(name_of_json_field),
          value: value,
          id: id,
        };
        return (
          <div className="radios-item" key={fieldProps.key}>
            <input
              style={{
                borderColor: color,
                marginRight: '1rem',
                height: '1.5rem',
                width: '1.5rem',
              }}
              {...fieldProps}
            />
            <label style={{color: color}}>{'  ' + label}</label>
            {errors[name_of_json_field] && (
              <div className="error-message">
                {errors[name_of_json_field].message}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/**
 * Form component handles different form inputs
 *
 *
 * @param {*} param0
 * @returns
 */
function Form({ formData, register, control, errors,classN, color}) {
  
  let renderedRows = formData.fields.map((field) => {
    let { type, required, data2, hasMoreFields } = field;

    const sinlgleTypes =
      type === 'email' ||
      type === 'number' ||
      type === 'date' ||
      type === 'text' ||
      type === 'phone';

    if (sinlgleTypes) {
      return renderSingleField(field, register, errors, color);
    } else if (type === 'radio' || type === 'checkbox') {
      // console.log(hasMoreFields);
      if (hasMoreFields) {
        let radios = renderRadios(field, register, errors, required, color);
        console.log(data2);

        try {
          let others;
          if (data2) {
            others =
              data2 !== []
                ? data2.map((item) => {
                    let { type } = item;

                    if (type === 'text') {
                      return renderSingleField(item, register, errors, color);
                    } else if (type === 'select') {
                      return renderSelectField(item, register, control, errors, color);
                    } else if (type === 'textarea') {
                      return null;
                    } else {
                      return null;
                    }
                  })
                : null;

            return (
              <>
                {radios}
                {others}
              </>
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return renderRadios(field, register, errors, required, color);
      }
    } else if (type === 'file') {
      return renderFile(field, register, errors, color);
    } else if (type === 'textarea') {
      return renderTextArea(field, register, color);
    } else if (type === 'select') {
      return renderSelectField(field, register, control, errors,color);
    } else if (type === 'section') {
      const { label } = field;
      return (
        <div className="section" style={{ borderBottom: '2rem' }}>
          {' '}
          <h4
            style={{
              color: color,
              height: '5rem',
            }}
          >
            {label}
          </h4>
        </div>
      );
    } else {
      return null;
    }
  });
  try {
    return (
      <div className={classN}>
        {renderedRows}
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Form;
