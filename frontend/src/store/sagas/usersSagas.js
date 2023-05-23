import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
  facebookLoginRequest,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess
} from "../actions/usersActions";
import {toast} from "react-toastify";
import {toastDefaultOptions} from "../../config";
import {historyPush} from "../actions/historyActions";

export function* loginUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);

    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    yield toast.success('Login successful!', toastDefaultOptions);
  } catch (e) {
    yield put(loginFailure(e));
  }
}

export function* facebookLoginSaga({payload: data}) {
 try {
   const response = yield axiosApi.post('/users/facebookLogin', data);

   yield put(loginSuccess(response.data));
   yield put(historyPush('/'));
   yield toast.success('Login successful!', toastDefaultOptions);
 } catch (e) {
   yield put(loginFailure(e));
 }
}

export function* logoutUserSaga({payload: userData}) {
  try {
    yield axiosApi.delete('/users/sessions', userData);
    yield put(logoutSuccess());
    yield put(historyPush('/'));
  } catch (e) {
    yield put(logoutFailure(e));
  }
}

const userSagas = [
  takeEvery(loginRequest, loginUserSaga),
  takeEvery(facebookLoginRequest, facebookLoginSaga),
  takeEvery(logoutRequest, logoutUserSaga)
];

export default userSagas;