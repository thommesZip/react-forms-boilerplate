# React Forms Boilerplate
This is boilerplate code I like use to build & handle forms in React. Instead of trying to build the 💍ne abstraction to rule them all, I use this as a starting point that can handle 95% of my typical use cases out of the box and adjust or extend it according to what the app needs.

It is structured to be easily adjustable, with all the elements that vary from app to app (but not within an app) in the shared.js file. (HTML-wrappers for fields according to Bootstrap, Tailwind CSS, Status-classNames etc.). 

Form and Fields are composable, just like if you would build form HTML and you can easily create new Field types.

## The goal...
... is to have a consistent way of creating, handling and styling forms throughout the entire application with no effort. Of course this is highly opinionated, but that´s what makes it easy to use.


### It does the following things:

- all basic form field types are included
- manages the inner state of the form
- accepts a config object for easy validation settings and initialValues
- can be set disabled (e.g. to toggle between "display mode" and "edit mode" of a form)
- can be set to loading state (in case the inital values are retrieved through an async API call)
- ensures the correct HTML wrappers around the fields
- is composable
- accepts a submit handler


## Here is a simple example:

```js
const fieldSettings = {
  name: {
    initialValue: '',
    validations: [
      { type: 'min', args: [2] },
      { type: 'max', args: [50] },
    ],
    validationType: 'string',
    required: true,
  },
};

function MyCustomForm(props) {
  const { disabled = false } = props;

  return (
    <Form
      enableReinitialize
      fields={fieldSettings}
      disabled={disabled}
      onSubmit={async (values, actions) => {
        // do some submit logic
      }}
    >
      <TextField
        name="name"
        type="text"
        label="Name"
        placeholder="John Doe"
      />

      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
 
```

Under the hood it uses <a hre="https://formik.org/docs/api/formik" target="_blank">Formik</a> to manage the form state & <a hre="https://github.com/jquense/yup" target="_blank">Yup</a> for the validation, but for most cases you can forget that and don´t have to import Formik and Yup everywhere.
If you need some fancier validation logic that is difficult to build with the settings-object, you provide a yup property and it will override the validations array. 


## Initial Setup
Open shared.js and change what you need.

### <FieldWrapper \/> 
The Fieldwrapper Component wraps all the Fields. Adjust to whatever HTML structure you need according to you CSS or CSS-Framework. The deafault uses the <a href="https://bulma.io/" target="_blank">Bulma.io</a> structure and classes.

By default it uses Material UI icons. Just remove or replace them.


### Status CSS classes
If necessary change these classes according to what you need and place them where you need. That might depend on you how your CSS works.

```js
export const inputErrorClass = 'is-danger';
export const helpMessageClass = 'help';
```

### <LoadingIndicator \>
This is rendered if isLoading is set to true. Just change the return to whatever you wish to look at while the form is in loading state.

## <Form \/>

### enableReinitialize
Set to true if the initialValues change (e.g. from initially an empty string to the value of an async API call)

### fields={fieldSettings}

- [fieldName]
  - initialValue
  - validations: Array of validation objects ({type: 'yup-function-name', args: ['additional args', 'for yup']})
  - validationType: string|mixed|number|booleam|date|array|object
  - required: Boolean

```js
const fieldSettings = {
  name: {
    initialValue: '',
    validations: [
      { type: 'min', args: [2] },
      { type: 'max', args: [50] },
    ],
    yup: yup.string().required(), // optional: 
    validationType: 'string',
    required: true,
  },
}
```

### disabled && isLoading
disabled: Optional (default false). Sets form disabled.

isLoading: Optional (default false). Sets the form disabled & displays a <LoadingIndicator \> Component. The LoadingIndicator can be changed in (shared.js)

The form will be disabled if one of them is true.

### onSubmit
Your submit handler. Receives (values, actions). See <a href="https://formik.org/docs/api/form" target="_blank">Formik documentation</a>.



## Fields

### TextField
```js
<TextField
  name="your-field-name"
  type="text|email|tel|date ..."
  label="Your Label"
  placeholder="Your Placeholder"
/>
```

### SelectField

```js
<SelectField
   name="your-field-name"
  options={[
    {
      value: "value-1",
      label: "Value 1",
    },
    {
      value: "value-2",
      label: "Value 2",
    },
  ]}
  label="Your Label"
   placeholder="Please Select something..."
/>
```


### Textarea
```js
<Textarea
  name="your-field-name"
  type="text|email|tel|date ..."
  label="Your Label"
  placeholder="Your Placeholder"
/>
```


### CheckBox
```js
<CheckBox name="accept-something">
  I accept some shady stuff. For more info click
  <a href="https://xyz.org" target="_blank" rel="noreferrer"> here</a>.
</CheckBox>
```

### RadioGroup

```js
<RadioGroup
  name="likeMusic"
  options={[{ value: true, label: "Yes" }, { value: false, label: "No }]}
  label="Do you like good music?"
/>
```

### SubmitButton
```js
 <SubmitButton>Save</SubmitButton>
```