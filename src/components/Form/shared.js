import React from 'react';
import { useFormikContext } from 'formik';

export const inputErrorClass = 'is-danger';
export const helpMessageClass = 'help';

export function FieldWrapper(props) {
  const { name, label, showIcons = true, fieldType } = props;
  const { errors, touched, values } = useFormikContext();

  const addClassesToField = {
    radio: 'pl-5',
  };

  return (
    <div className={`field field-${name}`}>
      {/* Here is the field label */}
      {label ? (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <div
        className={`control has-icons-right ${
          addClassesToField[fieldType] || ''
        }`}
      >
        {props.children}

        {/* Here is the error icon */}
        {showIcons && errors[name] && touched[name] ? (
          <span className="icon is-small is-right has-text">
            <i className="material-icons">error_outline</i>
          </span>
        ) : null}

        {/* Here is the success icon */}
        {showIcons &&
        !errors[name] &&
        touched[name] &&
        values[name] ? (
          <>
            <span className="icon is-small is-right has-text">
              <i className="material-icons">done</i>
            </span>
          </>
        ) : null}
      </div>

      {/* Here is the error message */}
      <div className="field-error">
        {errors[name] && touched[name] ? (
          <p className={`${helpMessageClass} ${inputErrorClass}`}>
            {errors[name]}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function LoadingIndicator() {
  return (
    <progress
      className="progress is-small is-primary"
      max="100"
      style={{ position: 'absolute', top: 0, left: 0 }}
    ></progress>
  );
}
