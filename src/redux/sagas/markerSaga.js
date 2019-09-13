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

function* updateMarkerType(action) {
  try {
    yield axios.put(`/api/locations/type/${action.payload.id}`, {type_id: action.payload.type_id})
    yield put({type: 'FETCH_LOCATIONS'})
  } catch (error) {
    console.log('error on updating location type through markers saga: ', error)
  }
}

function* markerSaga() {
  yield takeLatest('DELETE_MARKER', deleteMarker)
  yield takeLatest('UPDATE_MARKER_TYPE', updateMarkerType)
}

export default markerSaga
