import * as Yup from 'yup';

export function createFieldSchema(field = {}) {
  const {
    required,
    validations = [],
    validationType = 'string',
    yup,
  } = field;

  if (yup) return yup;

  if (!Yup[validationType]) {
    console.log(`😳 Yup has no validaitonType "${validationType}"`);
    return {};
  }
  let validationsArray = [...validations];
  if (required) {
    validationsArray = [...validationsArray, { type: 'required' }];
  }

  return validationsArray.reduce((validator, currentValue) => {
    const { type, args = [] } = currentValue;
    if (!validator[type]) {
      console.log(`😳 Yup.${type} has no type "${type}"`);
      return validator;
    }

    return validator[type](...args);
  }, Yup[validationType]());
}

export function getFormSettings(fields = {}) {
  let initialValues = {};
  let validation = {};

  Object.keys(fields).forEach((fieldName) => {
    const f = fields[fieldName];
    initialValues[fieldName] = f.initialValue || '';
    validation[fieldName] = createFieldSchema(f);
  });

  return {
    initialValues: initialValues,
    validation: Yup.object().shape(validation),
  };
}
