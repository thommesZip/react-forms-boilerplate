import React from 'react';

import {
  Form,
  TextField,
  SelectField,
  Textarea,
  SubmitButton,
  CheckBox,
  RadioGroup,
} from './Form';

const countryList = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Ecuador',
  'Guyana',
  'Paraguay',
  'Peru',
  'Suriname',
  'Uruguay',
  'Venezuela',
];

const getCountryOptions = () => {
  return countryList.map((c) => ({
    value: c,
    label: c,
  }));
};

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function MyForm(props) {
  const { data, disabled, isLoading } = props;
  const countries = getCountryOptions();
  const [formData, setFormData] = React.useState(data || {});

  React.useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const fields = React.useMemo(() => {
    return {
      name: {
        initialValue: formData?.name || '',
        validations: [
          { type: 'min', args: [2] },
          { type: 'max', args: [50] },
        ],
        validationType: 'string', // default string
        // yup: e.g. Yup.string().required() -> override validations with Yup for more complex validations
        required: true,
      },
      email: {
        initialValue: formData?.email || '',
        validations: [{ type: 'email', args: [] }],
        validationType: 'string', // default string
        required: true,
      },
      country: {
        initialValue: formData?.country || '',
        validations: [{ type: 'oneOf', args: [countryList] }],
        validationType: 'string', // default string
        required: true,
      },
      message: {
        initialValue: formData?.message || '',
        validations: [],
        validationType: 'string', // default string
        required: true,
      },
      accept: {
        initialValue: formData?.accept || '',
        validations: [
          { type: 'oneOf', args: [[true], 'Please accept...'] },
        ],
        validationType: 'bool', // default string
        required: true,
      },
      likeMusic: {
        initialValue: formData?.likeMusic || '',
        validations: [],
        validationType: 'string', // default string
        required: true,
      },
    };
  }, [formData]);

  return (
    <div className="columns is-centered">
      <div className="column is-7 is-centered box p-5">
        <h1 className="title has-text-centered p-5 is-1">My Form</h1>
        <hr className="mb-0" />
        <Form
          enableReinitialize
          fields={fields}
          isLoading={isLoading}
          disabled={disabled}
          onSubmit={async (values, actions) => {
            await sleep(3000);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <div className="columns">
            <div className="column is-6">
              <TextField
                name="name"
                type="text"
                label={'Name'}
                placeholder="John Doe"
              />
            </div>

            <div className="column is-6">
              <TextField
                name="email"
                type="email"
                label={'E-Mail'}
                placeholder="john.doe@acme.com"
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">
              <SelectField
                name="country"
                options={countries}
                label="Country"
                placeholder="Please select a country"
              />
            </div>
            <div className="column is-6">
              <RadioGroup
                name="likeMusic"
                options={[{ value: 'Yes' }, { value: 'No' }]}
                label="Do you like good music?"
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-12">
              <Textarea
                name="message"
                label="Message"
                placeholder="Please tell us something about you..."
              />
            </div>
          </div>

          <div className="columns">
            <div className="column is-12">
              <CheckBox name="accept">
                {' '}
                I accept some shady stuff. For more info click{' '}
                <a
                  href="https://thomaszipner.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                .
              </CheckBox>
            </div>
          </div>
          <div className="has-text-centered">
            <hr />
            <SubmitButton>Submit</SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
