import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { getFormSettings } from './utils';
import Textarea from './textarea';
import SubmitButton from './submit-button';
import TextField from './text-field';
import SelectField from './select-field';
import CheckBox from './checkbox';
import RadioGroup from './radio-group';
import { LoadingIndicator } from './shared';

function Form(props) {
  const { fields, disabled, isLoading } = props;

  const { initialValues, validation } = React.useMemo(
    () => getFormSettings(fields),
    [fields],
  );

  return (
    <Formik
      {...props}
      initialValues={initialValues}
      validationSchema={validation}
    >
      <FormikForm className="needs-validation" novalidate="">
        <div className="py-2 mb-3 is-relative">
          {isLoading ? <LoadingIndicator /> : null}
        </div>
        <fieldset disabled={disabled || isLoading}>
          {props.children}
        </fieldset>
      </FormikForm>
    </Formik>
  );
}

export {
  Form,
  CheckBox,
  SelectField,
  TextField,
  Textarea,
  SubmitButton,
  RadioGroup,
};
