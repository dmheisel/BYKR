import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import locationSaga from './locationSaga'
import mapSaga from './mapSaga'
import markerSaga from './markerSaga';

// rootSaga is the primary saga.

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    locationSaga(),
    mapSaga(),
    markerSaga()
  ]);
}
