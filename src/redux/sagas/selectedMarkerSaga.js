import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMarkerDetails(action) {
	//gets all location comments and average rating from database to store in redux state
	try {
		let response = yield axios.get(`/api/locations/info/${action.payload}`)
		yield put({ type: 'SET_SELECTED_MARKER', payload: response.data });
		yield put({ type: 'FETCH_COMMENTS', payload: action.payload });
		yield put({ type: 'FETCH_AVG_RATING', payload: action.payload });
		yield put({ type: 'FETCH_USER_RATING', payload: action.payload });
	} catch (error) {
		console.log('error on retrieving details for selected marker: ', error);
	}
}
//posts marker to save into database
function* saveMarker(action) {
	try {
		yield axios.post(`/api/account/save/${action.payload}`);
		yield put({ type: 'FETCH_USER' });
	} catch (error) {
		console.log(
			`error on adding saved location to user's saved locations: `,
			error
		);
	}
}
//deletes saved marker from database
function* unSaveMarker(action) {
	try {
		yield axios.delete(`/api/account/unsave/${action.payload}`);
		yield put({ type: 'FETCH_USER' });
	} catch (error) {
		console.log(
			'error on deleting saved location from users saved locations: ',
			error
		);
	}
}

function* locationSaga() {
	yield takeLatest('FETCH_MARKER_DETAILS', fetchMarkerDetails);
	yield takeLatest('SAVE_MARKER', saveMarker);
	yield takeLatest('UNSAVE_MARKER', unSaveMarker);
}

export default locationSaga;
