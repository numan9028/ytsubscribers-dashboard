import React from "react";
import { CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FullPageLoader = styled(Box)(({ theme }) => ({
  position: "fixed",
  display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  width: '100vw',
  height: '100vh',
  zIndex: 1111,
  backgroundColor: theme.palette.background.paper
}));

export default function PageLoader() {
  return (
    <FullPageLoader>
      <CircularProgress />
    </FullPageLoader>
  );
}