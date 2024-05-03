import {createSlice} from '@reduxjs/toolkit';
import {ModalState, ForceCloseState} from "../../types/modal";

/**
 * @type {ModalState}
 */
const initialState = {
  forceClose: {
    confirmDialog: false,
    otpDialog: false,
    scaleToast: false,
    indicator: false,
    alert: false,
  },
};
const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    /**
     * @param state
     * @param {{payload:ForceCloseState}} param1
     */
    setForceCloseModal(state, {payload}) {
      state.forceClose = {...state.forceClose, ...payload};
    },
  },
});

export default ModalSlice.reducer;
export const {setForceCloseModal} = ModalSlice.actions;
