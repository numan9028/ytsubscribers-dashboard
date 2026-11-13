import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { styled, alpha } from '@mui/material/styles';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltSharpIcon from '@mui/icons-material/RestartAltSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { reprocessOrderItem, updateOrderItem } from 'src/Redux/actions/ordersActions';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export default function OrderActionButton({ item, onReprocessed }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formValues, setFormValues] = React.useState({
    link: item.link || '',
    quantity: item.quantity == null ? '' : String(item.quantity),
    apiOrderId: item.apiOrderId || ''
  });
  const menuOpen = Boolean(anchorEl);
  const menuId = `order-action-menu-${item._id}`;
  const buttonId = `order-action-button-${item._id}`;

  const handleMenuClose = () => setAnchorEl(null);

  const handleEditOpen = () => {
    setFormValues({
      link: item.link || '',
      quantity: item.quantity == null ? '' : String(item.quantity),
      apiOrderId: item.apiOrderId || ''
    });
    setErrorMessage('');
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    if (!saving) {
      setDialogOpen(false);
      setErrorMessage('');
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quantity = Number(formValues.quantity);
    if (!formValues.link.trim() || !Number.isInteger(quantity) || quantity <= 0) {
      setErrorMessage('Enter a post link and a whole-number quantity greater than zero.');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    try {
      await dispatch(
        updateOrderItem({
          id: item._id,
          link: formValues.link.trim(),
          quantity,
          apiOrderId: formValues.apiOrderId.trim()
        })
      );
      setDialogOpen(false);
      toast.success('Post details updated successfully.');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Unable to update post details. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReprocess = async () => {
    setAnchorEl(null);
    const confirmation = item.apiOrderId
      ? `This item already has API order ID ${item.apiOrderId}. Reprocessing may create a duplicate order. Continue?`
      : 'This item has no API order ID. Submit it for processing now?';
    if (!window.confirm(confirmation)) {
      return;
    }

    setProcessing(true);
    try {
      const result = await dispatch(reprocessOrderItem(item._id));
      toast.success(result.message);
      try {
        await onReprocessed();
      } catch (error) {
        console.error('Unable to refresh order after reprocessing:', error);
        toast.error('The item was reprocessed, but order details could not be refreshed.');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Unable to reprocess this order item. Please try again.'
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Button
        id={buttonId}
        aria-controls={menuOpen ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        variant="contained"
        disableElevation
        disabled={processing}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Action
      </Button>
      <StyledMenu
        id={menuId}
        MenuListProps={{ 'aria-labelledby': buttonId }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleReprocess} disabled={processing} disableRipple>
          <RestartAltSharpIcon />
          {processing ? 'Reprocessing...' : 'Reprocessed'}
        </MenuItem>
      </StyledMenu>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby={`edit-post-title-${item._id}`}
      >
        <DialogTitle id={`edit-post-title-${item._id}`} sx={{ fontWeight: 700 }}>
          Edit Post Details
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={1.5}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <TextField
                label="Post Id"
                name="link"
                value={formValues.link}
                onChange={handleFieldChange}
                fullWidth
                required
              />
              <TextField
                label="Per Post"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleFieldChange}
                inputProps={{ min: 1, step: 1 }}
                fullWidth
                required
              />
              <TextField
                label="API Order ID"
                name="apiOrderId"
                value={formValues.apiOrderId}
                onChange={handleFieldChange}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Submit'}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={handleDialogClose}
              disabled={saving}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
