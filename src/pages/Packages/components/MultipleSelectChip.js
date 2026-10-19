import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { request } from 'src/Redux/helpers/axiosRequest';

export default function Tags(props) {
  // Get All Addons
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request({
      url: `${process.env.REACT_APP_API_URL}/addon/get-all`,
      method: "GET",
      data: null
    })
      // .then((res) => res.json())
      .then(({ data }) => {
        setAddons(data.addons);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      {!loading && addons.length > 0 && (
        <Autocomplete
          onChange={props.handleChange}
          multiple
          id={props.id}
          options={addons}
          getOptionLabel={(option) => option.title}
          defaultValue={props.addons}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Addons" placeholder="Add More" />}
        />
      )}
    </Stack>
  );
}
