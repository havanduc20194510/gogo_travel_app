import { createSlice } from '@reduxjs/toolkit';
//import config from '../../shared/const/Config';

const initialState = {
    account: {}, // dev/prod
    accessToken: null, //luu token
    authenticated: false,
};

// actions
const actions = {
    updateState(state, action) {
        Object.assign(state, action.payload);
    },
};

const AccountSlice = createSlice({
    name: 'slice/AccountSlice',
    initialState: initialState,
    reducers: actions,
    //   extraReducers: {},
});

export default AccountSlice.reducer;
export const AccountAction = AccountSlice.actions;
