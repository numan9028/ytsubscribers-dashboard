import React, { useState } from 'react';
import { Stack, Typography, Button, Box, Container } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const getSitemapContent = async () => {
    const url = `${process.env.REACT_APP_NODE_ROOT}/api/sitemap`;
    try {
      return axios.get(url);
    } catch (error) {
      throw error;
    }
};
const updateSitemapContent = async (reqData) => {
    const url = `${process.env.REACT_APP_NODE_ROOT}/api/sitemap/update`;
    try {
      return axios.post(url, reqData);
    } catch (error) {
      throw error;
    }
  };
  
  
export default function Sitemap() {
  // Fetch Data from API
  // Searchable Filters
  const [content, setContent] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  // Get Page Data
  React.useEffect(() => {
    setLoading(true);
    getSitemapContent().then(({ data }) => {
    console.log("data: ",data)
      setContent(data.sitemap);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const submitHandler = (e) => {
    setLoading(true);
    updateSitemapContent({ content })
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message);
          setContent(data.data);
          setEditing(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Unable to update file, please submit again.');
        setLoading(false);
      });
  };

  return (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Update Sitemap.xml
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            sx={{
              width: '100%'
            }}
          >
            <Box
              sx={{
                mb: 2
              }}
            >
              <label htmlFor="Sitemap">Sitemap.xml</label>
            </Box>
            <Box
              sx={{
                position: 'relative'
              }}
            >
              <textarea
                id="sitemap"
                readOnly={!editing}
                onChange={handleChange}
                style={{ width: '100%',height:'70vh', padding: 10, paddingBottom: 55, resize: 'vertical' }}
                value={content}
                rows="10"
              />
              {editing && (
                <ControlButtons setEditing={setEditing} submit={submitHandler} loading={loading} />
              )}
              {!editing && <ReadOnlyBackdrop setEditing={setEditing} />}
            </Box>
          </Box>
        </Stack>
      </Container>
  );
}

const ReadOnlyBackdrop = ({ setEditing }) => {
  return (
    <Box
      onDoubleClick={() => setEditing(true)}
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255,255,255,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p>Double Click to edit.</p>
    </Box>
  );
};

const ControlButtons = ({ setEditing, submit, loading }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.2)',
        borderRadius: '2px'
      }}
    >
      <Stack direction="row" width="100%" alignItems="center" justifyContent="flex-end" padding={1}>
        <Button
          type="button"
          size="large"
          variant="contained"
          color="error"
          disabled={loading}
          loading={loading}
          onClick={() => setEditing(false)}
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          size="large"
          type="submit"
          variant="contained"
          disabled={loading}
          loading={loading}
          onClick={() => submit()}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};
