import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';
import { FieldWrapper } from './shared';

export default function RadioGroup(props) {
  const { name, label, options } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <FieldWrapper {...props} showIcons={false} fieldType="radio">
        <div className="is-rounded">
          {options.map((optn, index) => (
            <label className="radio" key={`${name}-${index}`}>
              <FormikField
                type="radio"
                name={name}
                disabled={isSubmitting}
                value={optn.value}
              />
              {optn.label || optn.value}
            </label>
          ))}
        </div>
      </FieldWrapper>
    </>
  );
}
