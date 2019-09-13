import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateCenter(action) {
  try {
    let response = yield axios.get(`/api/geocode/coords/${action.payload}`)
    yield put({type: 'SET_CENTER', payload: response.data})
  } catch (error) {
    console.log('error on fetchCenter saga: ', error)
  }
}

function* mapSaga() {
  yield takeLatest('UPDATE_CENTER', updateCenter)
}
export default mapSaga;
