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
    <div className="field">
      {label ? <label className="label">{label}</label> : null}
      <div
        className={`control has-icons-right ${
          addClassesToField[fieldType] || ''
        }`}
      >
        {props.children}
        {showIcons && errors[name] && touched[name] ? (
          <span className="icon is-small is-right has-text">
            <i className="material-icons">error_outline</i>
          </span>
        ) : null}

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
      style={{ position: 'absolute', top: 0, letf: 0 }}
    ></progress>
  );
}
