import React from 'react';
import { Field as FormikField, useFormikContext } from 'formik';
import { FieldWrapper } from './shared';

export default function SelectField(props) {
  const { name, options, placeholder } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <FieldWrapper {...props} showIcons={false} fieldType="select">
        <div className="select is-rounded">
          <FormikField
            as="select"
            id={name}
            name={name}
            disabled={isSubmitting}
          >
            <option value="">{placeholder}</option>
            {options.map((optn, index) => (
              <option
                key={`${name}-${index}`}
                value={optn.value}
                label={optn.label || optn.value}
              />
            ))}
          </FormikField>
        </div>
      </FieldWrapper>
    </>
  );
}
