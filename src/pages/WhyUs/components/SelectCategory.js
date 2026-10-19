import React from 'react';
import { TextField } from 'formik-mui';
import { Field } from 'formik';
import { MenuItem } from '@mui/material';

function SelectCategory(props) {
  return (
    <div>
      <Field
        name={props.name}
        // value={props.data ? props.data : null}
        select
        // defaultValue=""
        component={TextField}
        sx={{ minWidth: 200, width: '95%' }}
        label="Select Value"
      >
        <MenuItem value="">Not Selected</MenuItem>
        {props.categories?.map((item) => {
          return (
            <MenuItem value={item._id} label={item.categoryName} key={item._id}>
              {item.categoryName}
            </MenuItem>
          );
        })}
      </Field>
    </div>
  );
}

export default SelectCategory;
