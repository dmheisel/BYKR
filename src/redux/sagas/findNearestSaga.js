import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* findNearestMarker(action) {
  try {
    console.log(action.payload)
    if (action.payload.is_third_party) {
      let closest = yield axios.get(`/api/locations?filters=${action.payload}`)
      console.log(closest.data)
    } else {

    }
  } catch (error) {

  }
}

function* findNearestSaga() {
  yield takeLatest('FIND_NEAREST_MARKER', findNearestMarker)
}
export default findNearestSaga
