import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';
import { FieldWrapper } from './shared';

export default function CheckBox(props) {
  const { name, label, value } = props;
  const { isSubmitting } = useFormikContext();

  console.log('isSubmitting', isSubmitting);
  return (
    <>
      <FieldWrapper {...props} showIcons={false} fieldType="checkbox">
        <label className="checkbox">
          {label}
          <FormikField
            type="checkbox"
            name={name}
            id={name}
            value={value}
            disabled={isSubmitting}
          />
          {props.children}
        </label>
      </FieldWrapper>
    </>
  );
}
