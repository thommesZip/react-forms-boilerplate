import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';
import { FieldWrapper, inputErrorClass } from './shared';

export default function Textarea(props) {
  const { name, placeholder } = props;
  const { errors, touched, isSubmitting } = useFormikContext();

  return (
    <>
      <FieldWrapper {...props} fieldType="textarea">
        <FormikField
          disabled={isSubmitting}
          as="textarea"
          id={name}
          name={name}
          placeholder={placeholder || ''}
          className={`textarea is-rounded ${
            errors[name] && touched[name] ? inputErrorClass : ''
          } has-icons-right`}
        />
      </FieldWrapper>
    </>
  );
}
