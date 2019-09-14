import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserRating(action) {
  try {
    let ratingResponse = yield axios.get(`/api/rating/${action.payload}`)
    yield put({type: 'SET_USER_RATING', payload: ratingResponse.data || 0})
  } catch (error) {
    console.log('error on fetching rating from database: ', error)
  }
}

function* updateUserRating(action) {
  try {
    yield axios.post(`/api/rating/${action.payload.locationId}`, action.payload)
    yield put('FETCH_USER_RATING', action.payload.id)
  } catch (error) {
    console.log('error on updating rating in database: ', error)
  }
}

function* ratingSaga() {
  yield takeLatest('UPDATE_USER_RATING', updateUserRating)
  yield takeLatest('FETCH_USER_RATING', fetchUserRating)
}

export default ratingSaga;
