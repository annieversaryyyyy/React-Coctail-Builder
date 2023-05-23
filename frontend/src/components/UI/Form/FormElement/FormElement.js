import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Paper, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required, inputProps, multiline, rows}) => {
  return (
    <Grid item xs={12}>
      <Paper>
        <TextField
          type={type}
          required={required}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error}
          autoComplete={name}
          inputProps={inputProps}
          multiline={multiline}
          rows={rows}
        />
      </Paper>
    </Grid>
  );
};

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  inputProps: PropTypes.object,
  multiline: PropTypes.bool,
  rows: PropTypes.number
};

export default FormElement;