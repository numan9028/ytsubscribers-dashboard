import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Stack,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Loader from 'src/components/Loader';
import moment from 'moment';
import { CalendarMonth } from '@mui/icons-material';
import { Button } from '@mui/material';
import { request } from 'src/Redux/helpers/axiosRequest';


export default function PaginationTable(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const [isSearching, setIsSearching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [month, setMonth] = useState(moment().format('MMMM'));
  const searchTimeout = React.useRef(null);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const getOrdersByPage= async (reqData) => {
    return request({
      url: `${process.env.REACT_APP_API_URL}/orders/get-all-by-page`,
      method: "POST",
      data: reqData
    })
  };
  
  const handleSearch = async (value) => {
    if(searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setIsSearching(true);
    setSearchText(value);
  };

  const handleClear = async () => {
    if(searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setIsSearching(true);
    setSearchText('');
  };
  const handleMonthChange = async (value) => {
    setIsSearching(true);
    setMonth(value);
  };
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const fetchData = async () => {
    setLoading(true);
    let qaEmails = ['nelsonmtaylor336@gmail.com'];
    try {
      const query = { ...paginationModel };
      if(props.match=='testing'){
        query.email=qaEmails
        
      }
      else{
        query.match=props.match;

      }
      if(searchText) {
        query.search = escapeRegExp(searchText);
      }
      if (month?.length && month !== 'All') {
        const startOfMonth = moment(month, 'MMMM').startOf('month').format();
        const endOfMonth = moment(month, 'MMMM').endOf('month').format();
        query.month = { $gte: startOfMonth, $lte: endOfMonth };
      
      }
      const response = await getOrdersByPage(query);
      setRows(response.data.orders);
      setRowCount(response.data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isSearching) {
      setPaginationModel({ page: 0, pageSize: 20 });
      setIsSearching(false);
    }
    if(searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    if (searchText === '') {
      fetchData();
    } else {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => {
        fetchData();
      }, 500);
    }
  }, [paginationModel, month, searchText]);
  return (
    <>
      <div style={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" gap={2} mb={1}>
          <TextField
            variant="outlined"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" color="action" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  style={{ visibility: searchText ? 'visible' : 'hidden' }}
                  onClick={() => {
                    handleClear();
                  }}
                >
                  <ClearIcon fontSize="small" color="action" />
                </IconButton>
              )
            }}
          />
          <CalendarMonth />
          <Select value={month} onChange={(e) => handleMonthChange(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            {[0, 1, 2].map((m) => (
              <MenuItem value={moment().subtract(m, 'months').format('MMMM')}>
                {moment().subtract(m, 'months').format('MMMM')}
              </MenuItem>
            ))}
          </Select>
          {/* {props.match === 'testing' &&
            <Button variant="contained" color="error" onClick={handleDeleteSelection}>
              Delete Selection
            </Button>
          } */}
        </Stack>
        <Typography variant="h5" gutterBottom>
          Data Table
        </Typography>
        {loading && <Loader />}
        {!loading && (
          <Stack
            sx={{
              boxShadow: 3,
              borderRadius: 1,
              border: '1px solid #929eaa6b',
              width: '100%',
              mt: 2
            }}
          >
            <DataGrid
              sx={{
                '& .MuiDataGrid-cell.order-items-cell': {
                  alignItems: 'flex-start',
                  py: 1
                },
                '& .MuiDataGrid-cell.order-items-cell .MuiDataGrid-cellContent': {
                  flex: 1,
                  height: '100%',
                  whiteSpace: 'normal',
                  alignItems: 'flex-start'
                },
                '& .MuiDataGrid-cell.order-actions-cell': {
                  pr: 2
                }
              }}
              rows={rows}
              getRowId={(row) => row._id}
              columns={props.columns}
              rowCount={rowCount}
              pageSize={20}
              autoHeight={true}
              disableSelectionOnClick
              disableColumnMenu
              checkboxSelection={true}
              rowSelectionModel={selectionModel}
              // onRowSelectionModelChange={handleSelectionModelChange}
              paginationModel={paginationModel}
              paginationMode="server"
              getRowHeight={(params) =>
                Math.max(52, (params.model.orderItems?.length || 0) * 40 + 45)
              }
              onPaginationModelChange={setPaginationModel}
              loading={loading}
            />
          </Stack>
        )}
      </div>
    </>
  );
}
