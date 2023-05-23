import usersSlice from "../slices/usersSlice";

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  facebookLoginRequest,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = usersSlice.actions;