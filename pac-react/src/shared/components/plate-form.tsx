import React from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Close as CloseIcon } from '@mui/icons-material';

import { addHours } from 'date-fns';
import { normalizePlate } from '../lib';
import { useAppDispatch } from '@/redux';
import { closeModal } from '@/redux/modal';
import {
  useCreatePlateMutation,
  useGetPlatesQuery,
  useUpdatePlateMutation,
} from '@/redux/plate';

import type { PlateType } from '@/shared/types';

interface Props {
  plate?: PlateType;
}

const plateRegex =
  /^[АВЕКМНОРСТУХABEKMHOPCTYX]{1}\d{3}[АВЕКМНОРСТУХABEKMHOPCTYX]{2}\d{2,3}$/i;

const timings: { label: string; hours: number }[] = [
  { label: 'сутки', hours: 12 },
  { label: '3 дня', hours: 72 },
  { label: 'неделя', hours: 168 },
  { label: 'месяц', hours: 720 },
];

export const PlateForm: React.FC<Props> = ({ plate }) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [isTemp, setIsTemp] = React.useState(false);
  const [tempIndex, setTempIndex] = React.useState(0);

  const validate = (value: string) => {
    const len = value.length;
    if (len < 6 || len > 9) return false;
    return plateRegex.test(value);
  };

  const normalized = normalizePlate(value);

  const shouldCheckPlate =
    normalized.length >= 6 &&
    normalized.length <= 9 &&
    validate(normalized) &&
    normalized !== plate?.number.toUpperCase();

  const dispatch = useAppDispatch();
  const {
    data,
    isLoading: isCheckLoading,
    isFetching: isCheckFetching,
  } = useGetPlatesQuery(
    { number: normalized },
    { skip: !shouldCheckPlate, refetchOnMountOrArgChange: true }
  );
  const [createPlate, { isLoading: isCreatePending }] =
    useCreatePlateMutation();
  const [updatePlate, { isLoading: isUpdatePending }] =
    useUpdatePlateMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toUpperCase().replace(/\s/g, '');
    const sanitized = input.replace(/[^АВЕКМНОРСТУХABEKMHOPCTYX0-9]/gi, '');

    setValue(sanitized);
    setError('');

    if (!validate(sanitized)) {
      setError('Неправильный формат госномера');
    }
  };

  const onSubmit = async (number: string) => {
    try {
      if (plate) {
        await updatePlate({
          id: plate.id,
          number: normalizePlate(number),
        }).unwrap();
        return dispatch(closeModal());
      }

      await createPlate({
        number: normalizePlate(number),
        expiresAt: addHours(new Date(), timings[tempIndex].hours),
      }).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error('PlateForm onSubmit:', error);
    }
  };

  React.useEffect(() => {
    if (plate?.number) {
      const clean = plate.number.toUpperCase().replace(/\s/g, '');
      setValue(clean);
    }
  }, [plate]);

  React.useEffect(() => {
    if (!isCheckFetching && data) {
      const duplicate = data.some((plate) => plate.number === normalized);
      if (duplicate) {
        setError('Номер уже есть');
      } else if (!validate(normalized)) {
        setError('Неправильный формат госномера');
      }
    }
  }, [data, isCheckFetching, normalized]);

  return (
    <Box
      sx={{
        p: 4,
        gap: 2,
        maxWidth: 450,
        bgcolor: grey[100],
        borderRadius: 1,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="h2">
          {plate ? 'Изменить номер' : 'Добавить номер'}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Typography
        variant="subtitle2"
        component="p"
        sx={{ my: 1, fontWeight: 400 }}
      >
        Введите госномер автомобиля в соответствии с российским
        законодательством
      </Typography>

      <Alert severity="info">
        Например: &#171;А123АА12&#187; или &#171;А123АА123&#187;
      </Alert>

      <Stack
        direction="row"
        sx={{
          my: 1,
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          type="text"
          value={value}
          onChange={handleChange}
          error={!!value && !!error}
          margin="normal"
          variant="outlined"
          label="Номерной знак"
          placeholder="Т315КР73"
          autoComplete="off"
          disabled={isCreatePending || isUpdatePending}
          inputProps={{
            maxLength: 9,
          }}
          sx={{
            flexShrink: 0,
            '& .MuiInputBase-input': {
              textTransform: 'uppercase',
            },
          }}
        />

        {isCheckLoading || isCheckFetching ? (
          <Box sx={{ mt: 1 }}>
            <CircularProgress color="primary" size={24} />
          </Box>
        ) : (
          value &&
          error && (
            <Typography
              color="error"
              variant="caption"
              component="p"
              sx={{ mt: 1, flexShrink: 1 }}
            >
              {error}
            </Typography>
          )
        )}
      </Stack>

      <Stack spacing={2} sx={{ my: 1 }}>
        <FormControlLabel
          label={
            <Typography
              variant="subtitle2"
              component="span"
              color={!value || error ? 'textDisabled' : 'textPrimary'}
              sx={{ fontWeight: 400 }}
            >
              {plate?.expiresAt ? 'Продлить время жизни' : 'Сделать временным'}
            </Typography>
          }
          control={
            <Checkbox
              color="primary"
              size="medium"
              checked={isTemp}
              onChange={() => setIsTemp((prev) => !prev)}
              sx={{ mr: 1, p: 0 }}
            />
          }
          disabled={!value || !!error}
        />
        {isTemp && (
          <Stack spacing={1} direction="row">
            {timings.map((timing, index) => (
              <Chip
                key={timing.hours}
                label={timing.label}
                color={tempIndex === index ? 'primary' : 'default'}
                disabled={!value || !!error}
                onClick={() => setTempIndex(index)}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Stack direction="row" sx={{ mt: 2 }}>
        <Button
          sx={{ width: 'fit-content', height: 48, display: 'block' }}
          size="large"
          onClick={() => onSubmit(value)}
          disabled={
            !value ||
            !!error ||
            (plate?.number === value && !isTemp) ||
            isCheckLoading ||
            isCheckFetching ||
            isCreatePending ||
            isUpdatePending
          }
        >
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
};
