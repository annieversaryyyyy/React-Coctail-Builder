import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
  user: null,
  loading: false,
  error: null
};

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, {payload: user}) {
      state.loading = false;
      state.user = user;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    facebookLoginRequest(state) {
      state.loading = false;
      state.error = null;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default usersSlice;















