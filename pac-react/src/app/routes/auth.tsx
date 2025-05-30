import React from 'react';
import { Box } from '@mui/material';
import { AuthForm } from '@/shared/components';

export function Auth(): React.JSX.Element {
  return (
    <React.Fragment>
      <Box sx={{ flex: 1, display: 'flex' }}>
        <AuthForm />
        <AuthForm />
      </Box>
    </React.Fragment>
  );
}
