import React from 'react';
import { Modal } from '@mui/material';
import { ModalComponents } from './modal-components';

import { selectModal, closeModal } from '@/redux/modal';
import { useAppDispatch, useAppSelector } from '@/redux';

export const GlobalModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, componentName, componentProps } = useAppSelector(selectModal);

  if (!componentName) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const ModalContent =
    ModalComponents[componentName as keyof typeof ModalComponents];

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ModalContent {...componentProps} />
    </Modal>
  );
};
