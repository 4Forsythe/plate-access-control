import React from 'react';
import { io } from 'socket.io-client';
import { grey } from '@mui/material/colors';
import { Box, Paper, Typography } from '@mui/material';
import { FixedSizeList as VirtualList } from 'react-window';
import { LogListItem } from './log-list-item';

import type { LogType } from '@/shared/types';

const socket = io('http://localhost:3000');

export const LogList: React.FC = () => {
  const [logs, setLogs] = React.useState<LogType[]>([]);

  React.useEffect(() => {
    socket.on('log:init', (logs: LogType[]) => {
      setLogs(logs);
    });

    socket.on('log:send', (log: LogType) => {
      setLogs((prev) => [log, ...prev]);
    });

    return () => {
      socket.off('log:init');
      socket.off('log:send');
    };
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {logs.length > 0 ? (
        <VirtualList
          width="100%"
          height={280}
          itemSize={32}
          itemCount={logs.length}
        >
          {({ index, style }) => (
            <Box style={{ ...style, height: 'fit-content' }}>
              <LogListItem key={logs[index].id} {...logs[index]} />
            </Box>
          )}
        </VirtualList>
      ) : (
        <Typography
          color={grey[600]}
          variant="subtitle2"
          component="p"
          sx={{ p: 1, textAlign: 'center', fontWeight: 400 }}
        >
          В журнале нет никаких записей
        </Typography>
      )}
    </Paper>
  );
};
