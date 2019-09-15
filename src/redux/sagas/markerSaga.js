import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLocations() {
	//get locations from server-database connection
	try {
		let response = yield axios.get('/api/locations');
		yield put({ type: 'SET_LOCATIONS', payload: response.data });
	} catch (error) {
		console.log('error on fetching locations and setting to redux state');
	}
}

function* deleteMarker(action) {
	try {
		yield axios.delete(`/api/locations/${action.payload}`);
		yield put({ type: 'FETCH_LOCATIONS' });
	} catch (error) {
		console.log('error on delete route through markers saga: ', error);
	}
}

function* fetchLocationTypes() {
	//gets all types of locations from the database and stores in redux state
	try {
		let response = yield axios.get('/api/locations/types');
		yield put({ type: 'SET_LOCATION_TYPES', payload: response.data });
	} catch (error) {
		console.log('error on fetching list of location types');
	}
}

function* updateMarkerType(action) {
	try {
		yield axios.put(`/api/locations/type/${action.payload.id}`, {
			type_id: action.payload.type_id
		});
		yield put({ type: 'FETCH_LOCATION_DETAILS', payload: action.payload.id})
		yield put({ type: 'FETCH_LOCATIONS' });
	} catch (error) {
		console.log(
			'error on updating location type through markers saga: ',
			error
		);
	}
}

function* markerSaga() {
	yield takeLatest('FETCH_LOCATIONS', fetchLocations);
	yield takeLatest('FETCH_LOCATION_TYPES', fetchLocationTypes);
	yield takeLatest('DELETE_MARKER', deleteMarker);
	yield takeLatest('UPDATE_MARKER_TYPE', updateMarkerType);
}

export default markerSaga;
