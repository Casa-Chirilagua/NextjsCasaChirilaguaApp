
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

function renderSingleField(field, register, errors, color, key) {
  const {
    type,
    name_of_json_field,
    placeholder,
    required,
    required_message,
    label,
  } = field;

  const fieldProps = {
    className: 'form-control',
    type: type,
    ...register(name_of_json_field, {
      required: required && required_message,
    }),
    placeholder: placeholder,
  };

  return (
    <div className="form-item" key={key}>
      <label style={{ color: color }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input key={uuidv4()} style={{ borderColor: color, border: errors[name_of_json_field] ? 'solid 0.1rem red' : color }}{...fieldProps} />
      {errors[name_of_json_field] && (
        <div className="error-message">
          {errors[name_of_json_field].message}
        </div>
      )}
    </div>
  );
}

function renderFile(field, register, errors, color, key) {
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
    className: 'form-control',
    type: type,
    ...register(name_of_json_field, {
      required: required && required_message,
    }),
    placeholder: placeholder,
  };

  return (
    <div className="form-item" key={key}>
      <label style={{ color: color }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <input style={{ borderColor: color }} {...fieldProps} name={name} />
      {errors[name_of_json_field] && (
        <div className="error-message">
          {errors[name_of_json_field].message}
        </div>
      )}
    </div>
  );
}

function renderSelectField(field, register, control, errors, color, key) {
  const { name_of_json_field, required, label, id, data } = field;

  const fieldProps = {
    control: control,
    className: 'form-control',
    name: name_of_json_field,
  };

  return (
    <div className="form-item" key={key}>
      <label style={{ color: color }}>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <Controller
        {...fieldProps}
        rules={{ required: required }}
        render={({ field }) => (
          <select {...field} id={id} style={{ color: color, border: `1px solid ${color}` }} className="form-control">
            <option style={{ color: color }} value="">Select</option>
            {data.map((item, index) => (
              <option key={index} value={item.abbreviation}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}

function renderTextArea(field, register, color, key) {
  let { id, rows, name_of_json_field, description, label, hasLabel } = field;

  return (
    <div className="form-item " key={key}>
      {hasLabel && <label style={{ color: color }}>{label}</label>}
      <textarea
        className="form-control"
        style={{ color: color }}
        id={id}
        row={rows}
        {...register(name_of_json_field)}
      >
      </textarea>
    </div>
  );
}

function renderRadios(field, register, errors, required, color, key) {
  const { label, type, data } = field;
  return (
    <React.Fragment key={key}>
      <h6 key={key} style={{ color: color }} className="">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </h6>
      {data.map((item, index) => {
        const { id, value, name_of_json_field, label } = item;
        const fieldProps = {
          className: 'form-check-input',
          type: type,
          ...register(name_of_json_field),
          value: value,
          id: id,
        };
        return (
          <div className="radios-item p-2 flex items-center" key={index}>
            <input

              style={{
                borderColor: color,
                marginRight: '1rem',
                height: '1.5rem',
                width: '1.5rem',
              }}
              {...fieldProps}
            />
            <label style={{ color: color }}>{'  ' + label}</label>
            {errors[name_of_json_field] && (
              <div className="error-message">
                {errors[name_of_json_field].message}
              </div>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
}

/**
 * Form component handles different form inputs
 *
 *
 * @param {*} param0
 * @returns
 */
function Form({ formData, register, control, errors, classN, color }) {

  let renderedRows = formData.fields.map((field, index) => {
    let { type, required, data2, hasMoreFields } = field;

    const sinlgleTypes =
      type === 'email' ||
      type === 'number' ||
      type === 'date' ||
      type === 'text' ||
      type === 'phone';

    if (sinlgleTypes) {
      return renderSingleField(field, register, errors, color, index);
    } else if (type === 'radio' || type === 'checkbox') {
      // //hasMoreFields);
      if (hasMoreFields) {
        let radios = renderRadios(field, register, errors, required, color, index);
        //data2);

        try {
          let others;
          if (data2) {
            others =
              data2 !== []
                ? data2.map((item, index2) => {
                  let { type } = item;

                  if (type === 'text') {
                    return renderSingleField(item, register, errors, color, index2);
                  } else if (type === 'select') {
                    return renderSelectField(item, register, control, errors, color, index2);
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
          //error);
        }
      } else {
        return renderRadios(field, register, errors, required, color, index);
      }
    } else if (type === 'file') {
      return renderFile(field, register, errors, color, index);
    } else if (type === 'textarea') {
      return renderTextArea(field, register, color, index);
    } else if (type === 'select') {
      return renderSelectField(field, register, control, errors, color, index);
    } else if (type === 'section') {
      const { label } = field;
      return (
        <div className="form-section font-normal text-5xl flex items-center justify-center " style={{ borderBottom: '2rem' }} key={index}>
          {label}
        </div>
      );
    } else {
      return null;
    }
  });
  try {
    return (
      <div className={`${classN} px-24 pt-8 pb-24 rounded-r-[12px]`} key={uuidv4()}>
        {renderedRows}
      </div>

    );
  } catch (error) {
    throw new Error(error);
  }
}

export default Form;
