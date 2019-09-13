import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteMarker(action) {
  try {
    yield axios.delete(`/api/locations/${action.payload}`)
    yield put({type: 'FETCH_LOCATIONS'})
  } catch (error) {
    console.log('error on delete route through markers saga: ', error)
  }
}

function* markerSaga() {
  yield takeLatest('DELETE_MARKER', deleteMarker)
}

export default markerSaga
