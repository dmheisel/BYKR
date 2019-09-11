import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLocations() {
	//get locations from server-database connection
	try {
		let response = yield axios.get('/api/locations');
		yield put({ type: 'SET_LOCATIONS', payload: response.data });
  } catch (error) {
    console.log('error on fetching locations and setting to redux state')
  }
}

function* addLocation(action) {
	//add location to database
	try {
    yield axios.post('/api/locations', action.payload);
	  yield put({type: 'FETCH_LOCATIONS'});
  } catch (error) {
    console.log('error on saga sending location to server')
  }
}

function* locationSaga() {
	yield takeLatest('FETCH_LOCATIONS', fetchLocations);
	yield takeLatest('ADD_LOCATION', addLocation);
}

export default locationSaga;
