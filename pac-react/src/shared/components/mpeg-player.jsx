import React from 'react';
import jsmpeg from 'jsmpeg';

import { Box } from '@mui/material';

export const MpegPlayer = () => {
  const socketRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    const socket = new WebSocket('ws://192.168.1.97:9000');
    socketRef.current = socket;

    const player = new jsmpeg(socket, {
      canvas: canvasRef.current,
      autoplay: true,
      loop: true,
      audio: false,
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <Box
      sx={{
        mb: 2,
        width: '100%',
        height: 'auto',
        maxHeight: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ maxWidth: '100%', maxHeight: 'auto', objectFit: 'contain' }}
      />
    </Box>
  );
};
