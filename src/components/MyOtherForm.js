import React from 'react';
import { Form, TextField, SubmitButton } from './form';

export default function MyOtherForm(props) {
  const { data, disabled, isLoading } = props;
  const [formData] = React.useState(data || {});

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
      date: {
        initialValue: formData?.date || '',
        validations: [],
        validationType: 'date', // default string
        required: true,
      },
      time: {
        initialValue: formData?.time || '',
        validations: [],
        validationType: 'string', // default string
        required: true,
      },
    };
  }, [formData]);

  return (
    <div className="columns is-centered">
      <div className="column is-12 is-centered box pt-5 px-0">
        <h2 className="title has-text-centered pt-3">
          Schedule a date
        </h2>
        <p className="has-text-centered">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua.
        </p>

        <Form
          enableReinitialize
          fields={fields}
          isLoading={isLoading}
          disabled={disabled}
          onSubmit={async (values, actions) => {
            console.log('hi');
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <div className="px-2" style={{ background: '#efefef' }}>
            <div className="columns is-centered">
              <div className="column is-3">
                <TextField
                  name="name"
                  type="text"
                  label={'Name'}
                  placeholder="John Doe"
                />
              </div>
              <div className="column is-3">
                <TextField
                  name="date"
                  type="date"
                  label={'Date'}
                  placeholder=""
                />
              </div>
              <div className="column is-3">
                <TextField
                  name="time"
                  type="time"
                  label="Time"
                  placeholder=""
                />
              </div>
              <div className="column is-1 is-flex is-align-items-flex-end">
                <SubmitButton>Submit</SubmitButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
