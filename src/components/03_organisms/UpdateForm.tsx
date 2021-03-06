import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import ImageUpload from '../../containers/ImageUpload';

const useStyles = makeStyles(() =>
  createStyles({
    field: {
      marginTop: 20,
    },
  })
);

const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = ['title', 'visible', 'note'];
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
    {/* {renderFromHelper({ touched, error })} */}
  </FormControl>
);

const UpdateForm = (props: any) => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  const [resetStatue, resetTriger] = React.useState(false);
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="title" component={renderTextField} label="Title" />
      </div>
      <div className={classes.field}>
        <Field name="visible" component={renderSelectField} label="Visible">
          <option value="public" defaultChecked>
            public
          </option>
          <option value="private">private</option>
        </Field>
      </div>
      <div>
        <Field
          name="picture"
          component={ImageUpload}
          type="file"
          value={null}
          reset={resetStatue}
          resetTriger={resetTriger}
        />
      </div>
      <div>
        <Field
          name="note"
          component={renderTextField}
          label="Note"
          multiline
          rowsMax="4"
          margin="normal"
        />
      </div>
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
  form: 'UpdateForm', // a unique identifier for this form
  validate,
})(UpdateForm);
