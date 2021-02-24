import * as React from 'react';
import {
  render,
  screen,
  act,
  // fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Form,
  TextField,
  SelectField,
  Textarea,
  SubmitButton,
  CheckBox,
  RadioGroup,
} from '.';

const emailErrorMessage = 'Please submit a valid email!';
const futureDateErrorMessage = 'The date has to be in the future.';

const fields = {
  name: {
    initialValue: '',
    validations: [
      { type: 'min', args: [2] },
      { type: 'max', args: [50] },
    ],
    validationType: 'string', // default string
    // yup: e.g. Yup.string().required() -> override validations with Yup for more complex validations
    required: true,
  },
  email: {
    initialValue: '',
    validations: [{ type: 'email', args: [emailErrorMessage] }],
    validationType: 'string', // default string
    required: true,
  },
  date: {
    initialValue: '',
    validations: [
      {
        type: 'min',
        args: [new Date(), futureDateErrorMessage],
      },
    ],
    validationType: 'date', // default string
    required: true,
  },
};

const testValues = {
  name: 'John Travolta',
  email: 'john.travolta@gmail.com',
  date: '2099-12-12',
};

test('Form validation & submission test', async () => {
  const handleSubmit = jest.fn();

  const { container } = render(
    <Form
      enableReinitialize
      fields={fields}
      isLoading={false}
      disabled={false}
      onSubmit={async (values, actions) => handleSubmit(values)}
    >
      <div data-testid="name-field">
        <TextField
          name="name"
          type="text"
          label="Name"
          placeholder="John Doe"
        />
      </div>
      <div data-testid="email-field">
        <TextField
          name="email"
          type="email"
          label="E-Mail"
          placeholder=""
        />
      </div>
      <div data-testid="date-field">
        <TextField
          name="date"
          type="date"
          label="Date"
          placeholder=""
        />
      </div>
      <SubmitButton>Submit</SubmitButton>
    </Form>,
  );

  await act(async () => userEvent.click(screen.getByText(/Submit/i)));
  expect(handleSubmit).toBeCalledTimes(0);

  expect(screen.getByTestId('name-field').textContent).toContain(
    'name is a required field',
  );
  expect(screen.getByTestId('email-field').textContent).toContain(
    'email is a required field',
  );
  expect(screen.getByTestId('date-field').textContent).toContain(
    'date is a required field',
  );

  await userEvent.type(screen.getByLabelText(/E-Mail/i), 'xyz', {
    delay: 0.01,
  }),
    expect(screen.getByTestId('email-field').textContent).toContain(
      emailErrorMessage,
    );

  await userEvent.type(
    screen.getByLabelText(/E-Mail/i),
    '{backspace}{backspace}{backspace}',
    {
      delay: 0.01,
    },
  );

  await userEvent.type(
    screen.getByLabelText(/E-Mail/i),
    testValues.email,
    {
      delay: 0.01,
    },
  ),
    expect(screen.getByLabelText(/E-Mail/i).value).toBe(
      testValues.email,
    );

  await userEvent.type(
    screen.getByLabelText(/Name/i),
    testValues.name,
    {
      delay: 0.01,
    },
  );

  await userEvent.type(screen.getByLabelText(/Date/i), '2020-06-01', {
    delay: 0.01,
  });

  expect(screen.getByTestId('date-field').textContent).toContain(
    futureDateErrorMessage,
  );

  await userEvent.type(
    screen.getByLabelText(/Date/i),
    testValues.date,
    {
      delay: 0.01,
    },
  );

  await act(async () => userEvent.click(screen.getByText(/Submit/i)));
  expect(handleSubmit).toHaveBeenCalledWith(testValues);
  expect(handleSubmit).toBeCalledTimes(1);
});

test('Initial data loading test', async () => {
  const handleSubmit = jest.fn();
  const withoutInititalValue = {
    name: {
      initialValue: '',
      required: true,
    },
  };
  const withInititalValue = {
    name: {
      initialValue: testValues.name,
      required: true,
    },
  };

  const { rerender } = render(
    <Form
      enableReinitialize
      fields={withoutInititalValue}
      isLoading={true}
      disabled={false}
      onSubmit={async (values, actions) => handleSubmit(values)}
    >
      <div data-testid="name-field">
        <TextField
          name="name"
          type="text"
          label="Name"
          placeholder="John Doe"
        />
      </div>
    </Form>,
  );

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText(/Name/i), 'Django', {
    delay: 0.01,
  });

  // field has no diabled attribute, but is in a disabled fieldset
  expect(screen.getByLabelText(/Name/i).value).toBe('');

  rerender(
    <Form
      enableReinitialize
      fields={withInititalValue}
      isLoading={false}
      disabled={false}
      onSubmit={async (values, actions) => handleSubmit(values)}
    >
      <div data-testid="name-field">
        <TextField
          name="name"
          type="text"
          label="Name"
          placeholder="John Doe"
        />
      </div>
    </Form>,
  );
  expect(screen.getByLabelText(/Name/i).value).toBe(testValues.name);
  await userEvent.type(screen.getByLabelText(/Name/i), '{enter}', {
    delay: 0.01,
  });
  expect(handleSubmit).toHaveBeenCalledWith({
    name: withInititalValue.name.initialValue,
  });
  expect(handleSubmit).toBeCalledTimes(1);
});
