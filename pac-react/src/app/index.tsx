import React from 'react';
import { Outlet } from 'react-router';
import { grey } from '@mui/material/colors';
import { Box, Container } from '@mui/material';

import { GlobalModal } from '@/shared/components';

export function Root(): React.JSX.Element {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: grey[900],
        bgcolor: grey[100],
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ px: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Box>
        <GlobalModal />
      </Container>
    </Box>
  );
}
