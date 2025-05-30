import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

export const AuthForm: React.FC = () => {
  return (
    <Stack
      spacing={3}
      sx={{
        mx: 'auto',
        width: '100%',
        maxWidth: 300,
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} direction="row">
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          Добро пожаловать
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <TextField
          id="login"
          type="text"
          variant="outlined"
          size="small"
          label="Логин"
        />
        <TextField
          id="password"
          type="password"
          variant="outlined"
          size="small"
          label="Пароль"
        />
      </Stack>

      <Button variant="contained">Войти</Button>
    </Stack>
  );
};
