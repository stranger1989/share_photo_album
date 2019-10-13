import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const sleep = (ms: number) => new Promise((resolve: any) => setTimeout(resolve, ms));

const asyncValidate = (values: any) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      // eslint-disable-next-line no-throw-literal
      throw { email: 'Email already Exists' };
    }
  });
};

const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'notes'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const renderTextField: React.FC<any> = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderSelectField: React.FC<any> = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="visible">Visible</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'visible',
        id: 'visible',
      }}
    >
      {children}
    </Select>
    {/* {renderFromHelper({ touched, error })} */}
  </FormControl>
);

const MaterialUiForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="title" component={renderTextField} label="Title" />
      </div>
      <div>
        <Field classes={classes} name="visible" component={renderSelectField} label="Visible">
          <option value="public">public</option>
          <option value="private">private</option>
        </Field>
      </div>
      <div />
      <div>
        <Field name="notes" component={renderTextField} label="Notes" multiline rowsMax="4" margin="normal" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={() => {
            reset();
          }}
        >
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(MaterialUiForm);
