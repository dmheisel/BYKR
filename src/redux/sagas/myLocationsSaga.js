import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserFavorites(action) {
  try {
    let response = yield axios.get(`/api/myLocations/favorites/:id`)
    yield put({type: 'SET_USER_FAVORITES', payload: response.data})
  } catch (error) {
    console.log('error on retrieving users favorites: ', error)
  }
}

function* fetchUserCreated(actions) {
  try {
    let response = yield axios.get(`api/myLocations/created/:id`)
    yield put({ type: 'SET_USER_CREATED', payload: response.data })
  } catch (error) {
    console.log('error on retrieving users created: ', error)
  }
}

function* myLocationsSaga() {
  yield takeLatest('FETCH_USER_FAVORITES', fetchUserFavorites)
  yield takeLatest('FETCH_USER_CREATED', fetchUserCreated)
}
export default myLocationsSaga
