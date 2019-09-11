import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLocations() {
  //get locations from server-database connection
  let response = yield axios.get('/api/locations');
  yield put({type:'SET_LOCATIONS', payload: response.data})
}

function* locationSaga() {
  yield takeLatest('FETCH_LOCATIONS', fetchLocations)
}

export default locationSaga;
