import React from 'react';
import { Box, Typography } from '@mui/material';

import type { LogType } from '@/shared/types';

export const LogListItem: React.FC<LogType> = ({
  plate,
  action,
  status,
  timestamp,
}) => {
  return (
    <Box sx={{ py: 0 }}>
      <Typography
        variant="subtitle2"
        component="p"
        color={status === 'info' ? 'textPrimary' : status}
      >
        {`[${new Date(timestamp).toLocaleString(undefined, {
          month: '2-digit',
          day: '2-digit',
        })}-${new Date(timestamp).toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}] ${plate ? `(${plate}) —` : ''} ${action}`}
      </Typography>
    </Box>
  );
};
