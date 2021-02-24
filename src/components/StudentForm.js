import React from 'react';
import {
  Form,
  TextField,
  SelectField,
  Textarea,
  SubmitButton,
  CheckBox,
  RadioGroup,
} from './form';
import { useStudent, useStudentsDispatch } from '../student-context';

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

export default function StudentForm(props) {
  const { studentId, disabled, onSuccess = () => {} } = props;
  const countries = React.useMemo(getCountryOptions, []);
  const { loading, data } = useStudent(studentId);
  const dispatch = useStudentsDispatch();

  const fields = React.useMemo(() => {
    return {
      name: {
        initialValue: data?.name || '',
        validations: [
          { type: 'min', args: [2] },
          { type: 'max', args: [50] },
        ],
        validationType: 'string', // default string
        // yup: e.g. Yup.string().required() -> override validations with Yup for more complex validations
        required: true,
      },
      email: {
        initialValue: data?.email || '',
        validations: [{ type: 'email', args: [] }],
        validationType: 'string', // default string
        required: true,
      },
      country: {
        initialValue: data?.country || '',
        validations: [{ type: 'oneOf', args: [countryList] }],
        validationType: 'string', // default string
        required: true,
      },
      message: {
        initialValue: data?.message || '',
        validations: [],
        validationType: 'string', // default string
        required: true,
      },
      accept: {
        initialValue: data?.accept || '',
        validations: [
          { type: 'oneOf', args: [[true], 'Please accept...'] },
        ],
        validationType: 'bool', // default string
        required: true,
      },
      likeMusic: {
        initialValue: data?.likeMusic || '',
        validations: [],
        validationType: 'string', // default string
        required: true,
      },
    };
  }, [data]);

  return (
    <div className="is-centered box p-5">
      <h1 className="title has-text-centered p-5 is-1">
        {loading ? '...' : data ? data.name : 'New Student'}
      </h1>
      <hr className="mb-0" />
      <Form
        enableReinitialize
        fields={fields}
        isLoading={loading}
        disabled={disabled}
        onSubmit={async (values, { resetForm }) => {
          dispatch({
            type: 'UPSERT_STUDENT',
            data: { ...values, id: studentId },
          });
          onSuccess();
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
          <SubmitButton>Save</SubmitButton>
        </div>
      </Form>
    </div>
  );
}
