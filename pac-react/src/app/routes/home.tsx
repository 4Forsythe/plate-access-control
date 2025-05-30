import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import {
  Alert,
  Button,
  Divider,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '@/redux';
import { openModal } from '@/redux/modal';
import { useOpenEnterMutation } from '@/redux/enter';
import {
  LogList,
  PlateList,
  ConfirmButton,
  MpegPlayer,
} from '@/shared/components';

import type { PlateType } from '@/shared/types';

export function Home(): React.JSX.Element {
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const dispatch = useAppDispatch();
  const [openEnter, { isLoading: isPending }] = useOpenEnterMutation();

  const handleMutation = async () => {
    const status = await openEnter().unwrap();

    if (status === 'allowed') {
      setIsSnackbarOpen(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('На шлагбаум был подан сигнал');
    } else {
      setIsSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Произошла ошибка при подаче сигнала');
    }
  };

  const handleModal = (plate?: PlateType) => {
    dispatch(
      openModal({ componentName: 'PlateForm', componentProps: { plate } })
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={12} sx={{ my: 8, flex: 1 }}>
        <Grid size={6}>
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="h4" component="h1">
                Белый лист
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleModal()}
              >
                Добавить
                <AddIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Button>
            </Stack>
            <PlateList />
          </Stack>
        </Grid>

        <Grid size={6}>
          <Stack spacing={4}>
            <Stack>
              <MpegPlayer />
              <ConfirmButton
                color="primary"
                onClick={handleMutation}
                loading={isPending}
                disabled={isPending}
              >
                Открыть шлагбаум
              </ConfirmButton>
            </Stack>
            <Divider />
            <Stack spacing={2}>
              <Typography variant="h5" component="h5" sx={{ fontWeight: 400 }}>
                Журнал событий
              </Typography>
              <LogList />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={5000}
      >
        <Alert
          severity={snackbarSeverity === 'success' ? 'success' : 'error'}
          onClose={() => setIsSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
