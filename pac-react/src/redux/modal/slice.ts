import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ModalComponentType } from '@/shared/components';

interface ModalState {
  isOpen: boolean;
  componentName: ModalComponentType | null;
  componentProps: Record<string, any>;
}

const initialState: ModalState = {
  isOpen: false,
  componentName: null,
  componentProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        componentName: ModalComponentType;
        componentProps?: Record<string, any>;
      }>
    ) => {
      state.isOpen = true;
      state.componentName = action.payload.componentName;
      state.componentProps = action.payload.componentProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.componentName = null;
      state.componentProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
