import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';
import { FieldWrapper, inputErrorClass } from './shared';

export default function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  const { errors, touched, isSubmitting } = useFormikContext();

  return (
    <FieldWrapper {...props} fieldType="textfield">
      <FormikField
        {...rest}
        id={name}
        name={name}
        disabled={isSubmitting}
        placeholder={placeholder || ''}
        className={`input is-rounded ${
          errors[name] && touched[name] ? inputErrorClass : ''
        } has-icons-right`}
      />
    </FieldWrapper>
  );
}
