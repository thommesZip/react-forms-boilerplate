import React from 'react';
import { useFormikContext } from 'formik';
import { FieldWrapper } from './shared';

export default function SubmitButton(props) {
  const { title, ...rest } = props;
  const formikContext = useFormikContext();

  if (!formikContext) {
    throw new Error(`SubmitButton has to be wrapped by Form.`);
  }
  const { isSubmitting } = formikContext;

  return (
    <FieldWrapper {...props} fieldType="submit">
      <button
        className={`button is-rounded is-primary${
          isSubmitting ? ' is-loading' : ''
        }`}
        type="submit"
        {...rest}
        disabled={isSubmitting}
      >
        {title || props.children}
      </button>
    </FieldWrapper>
  );
}
