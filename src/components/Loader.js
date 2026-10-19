import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ width: 350, mx: 'auto' }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
