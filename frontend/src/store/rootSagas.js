import {all} from 'redux-saga/effects';
import userSagas from "./sagas/usersSagas";
import cocktailsSagas from "./sagas/cocktailSagas";
import historySagas from "./sagas/historySagas";
import history from '../history';

export default function* rootSagas(){
  yield all([
    ...userSagas,
    ...cocktailsSagas,
    ...historySagas(history),
  ])
}