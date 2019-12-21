import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import ImageUpload from '../../containers/ImageUpload';

const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = ['title', 'visible', 'imageToUpload', 'notes'];
  requiredFields.forEach(field => {
    if (!values[field] || values[field].length === 0) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const renderTextField: React.FC<any> = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    fullWidth
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
);

const renderSelectField: React.FC<any> = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="visible" shrink={true}>
      Visible
    </InputLabel>
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
  </FormControl>
);

const PostForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  const [resetStatue, resetTriger] = React.useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Field name="title" component={renderTextField} label="Title" />
      </Box>
      <Box mt={'20px'}>
        <Field name="visible" component={renderSelectField} label="Visible">
          <option value="public" defaultChecked>
            public
          </option>
          <option value="private">private</option>
        </Field>
      </Box>
      <Box>
        <Field
          name="imageToUpload"
          component={ImageUpload}
          type="file"
          value={null}
          reset={resetStatue}
          resetTriger={resetTriger}
        />
      </Box>
      <Box>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          multiline
          rowsMax="4"
          margin="normal"
        />
      </Box>
      <DialogActions>
        <Button
          type="submit"
          disabled={pristine || submitting || invalid}
          color="primary"
        >
          Submit
        </Button>
        <Button
          type="button"
          disabled={pristine || submitting}
          color="secondary"
          onClick={() => {
            reset();
            resetTriger(true);
          }}
        >
          Clear Values
        </Button>
      </DialogActions>
    </form>
  );
};

export default reduxForm({
  form: 'PostForm', // a unique identifier for this form
  validate,
})(PostForm);
