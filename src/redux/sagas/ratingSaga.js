import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRating(action) {
  try {
    let ratingResponse = axios.get(`/api/rating/${id}`)
    yield put('SET_RATING', ratingResponse.data)
  } catch (error) {
    console.log('error on fetching rating from database: ', error)
  }
}

function* updateRating(action) {
  try {
    yield axios.post(`/api/rating/${id}`, action.payload)
    yield put('FETCH_RATING', action.payload.id)
  } catch (error) {
    console.log('error on updating rating in database: ', error)
  }
}

function* ratingSaga() {
  yield takeLatest('UPDATE_RATING', updateRating)
  yield takeLatest('FETCH_RATING', fetchRating)
}

export default ratingSaga;
