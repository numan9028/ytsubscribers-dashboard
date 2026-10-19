import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import { singleUser } from 'src/Redux/actions/authActions';
import { request } from 'src/Redux/helpers/axiosRequest';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/user-profile'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Single User
  const pageState = useSelector((state) => state.auth.items);
  const [pageSections, setPageSection] = useState({
    data: []
  });
  const formData = pageState;

  // Modal open / close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Get Single User Data
  useEffect(() => {
    setPageSection({
      ...formData
    });
  }, [pageState.user]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        dispatch(singleUser(userId));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  // Logout
  const handleLogout = (e) => {
    e.preventDefault();
    // localStorage.removeItem('token');
    // localStorage.removeItem('role');
    localStorage.removeItem('userId');
    request({
      url: `${process.env.REACT_APP_NODE_ROOT}/logout`,
      method: "POST",
      data: null
    });
    toast.success('Log Out Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {pageState.loading ? (
          'Loading...'
        ) : (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {pageState.user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {pageState.user?.email}
            </Typography>
          </Box>
        )}
        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
