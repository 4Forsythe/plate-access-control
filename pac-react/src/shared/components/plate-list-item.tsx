import React from 'react';
import {
  Stack,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Abc as AbcIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { openModal } from '@/redux/modal';
import { useAppDispatch } from '@/redux';

import type { PlateType } from '@/shared/types';
import { useDeletePlateMutation } from '@/redux/plate';

export const PlateListItem: React.FC<PlateType> = ({
  id,
  number,
  createdAt,
  updatedAt,
  expiresAt,
}) => {
  const dispatch = useAppDispatch();
  const [deletePlate, { isLoading: isDeletePending }] =
    useDeletePlateMutation();

  const handleModal = () => {
    dispatch(
      openModal({
        componentName: 'PlateForm',
        componentProps: {
          plate: { id, number, createdAt, updatedAt, expiresAt },
        },
      })
    );
  };

  const handleDelete = async () => {
    await deletePlate(id).unwrap();
  };

  return (
    <ListItem
      sx={{ px: 1 }}
      secondaryAction={
        <Stack spacing={1} direction="row" sx={{ mx: 2 }}>
          <Tooltip title="Удалить" placement="bottom" arrow>
            <IconButton
              edge="end"
              color="error"
              onClick={handleDelete}
              loading={isDeletePending}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemButton onClick={handleModal}>
        <ListItemIcon sx={{ px: 1, minWidth: 52 }}>
          <AbcIcon />
        </ListItemIcon>

        <ListItemText
          primary={number}
          secondary={
            expiresAt
              ? `действует до ${new Date(expiresAt).toLocaleDateString()}`
              : 'постоянный'
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
