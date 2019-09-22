import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMarkers(action) {
	//get locations from server-database connection
	try {
		let url = '/api/locations';
		if (action.payload) {
			yield console.log('filtering map for ids: ', action.payload);
			let filterString = '?filters=';
			action.payload
				.filter(el => !el.is_third_party)
				.forEach((el, index) => {
					if (index > 0) {
						filterString += ',';
					}
					filterString += el.id;
				});
			console.log(filterString);
			url += filterString;
			if (action.payload.some(el => el.is_third_party)) {
				console.log('making third party api request to niceRide API');
				yield put({ type: 'FETCH_API_MARKERS' });
			} else {
				yield put({ type: 'CLEAR_API_MARKERS' });
			}
			if (action.payload.some(el => !el.is_third_party)) {
				let response = yield axios.get(url);
				yield put({ type: 'SET_MARKER_LIST', payload: response.data });
			} else {
				yield put({type: 'CLEAR_MARKERS'})
			}
		} else {
			yield put({ type: 'CLEAR_API_MARKERS' });
			let response = yield axios.get(url);
			yield put({ type: 'SET_MARKER_LIST', payload: response.data });
		}
	} catch (error) {
		console.log(
			'error on fetching locations and setting to redux state: ',
			error
		);
	}
}

function* fetchAPIMarkers() {
	try {
		let response = yield axios.get(
			`https://gbfs.niceridemn.com/gbfs/en/station_information.json`
		);
		yield put({
			type: 'SET_API_MARKERS',
			payload: response.data.data.stations
		});
	} catch (error) {
		console.log('error on gathering API markers (NiceRide, etc): ', error);
	}
}

function* fetchMarkerTypes() {
	//gets all types of locations from the database and stores in redux state
	try {
		let response = yield axios.get('/api/locations/types');
		yield put({ type: 'SET_MARKER_TYPES', payload: response.data });
	} catch (error) {
		console.log('error on fetching list of location types');
	}
}

function* addNewMarker(action) {
	try {
		let response = yield axios.get(
			`api/geocode/address/${action.payload.coords.lat},${action.payload.coords.lng}`
		);
		yield console.log(response);
		let returningID = yield axios.post('/api/locations', {
			...action.payload,
			address: response.data.address,
			locality: response.data.locality
		});
		yield put({ type: 'FETCH_MARKERS' });
		yield put({ type: 'FETCH_MARKER_DETAILS', payload: returningID.data.id });
	} catch (error) {
		console.log('error on saga sending location to server: ', error);
	}
}

function* findNearestMarker(action) {
	// yield axios.get('/api/locations/closest/')
}

function* deleteMarker(action) {
	try {
		yield axios.delete(`/api/locations/${action.payload}`);
		yield put({ type: 'FETCH_USER_CREATED' });
	} catch (error) {
		console.log('error on delete route through markers saga: ', error);
	}
}

function* updateMarkerType(action) {
	try {
		yield axios.put(`/api/locations/type/${action.payload.id}`, {
			type_id: action.payload.type_id
		});
		yield put({ type: 'FETCH_LOCATION_DETAILS', payload: action.payload.id });
		yield put({ type: 'FETCH_MARKERS' });
	} catch (error) {
		console.log(
			'error on updating location type through markers saga: ',
			error
		);
	}
}

function* markerSaga() {
	yield takeLatest('FETCH_MARKERS', fetchMarkers);
	yield takeLatest('FETCH_API_MARKERS', fetchAPIMarkers);
	yield takeLatest('FETCH_MARKER_TYPES', fetchMarkerTypes);
	yield takeLatest('ADD_NEW_MARKER', addNewMarker);
	yield takeLatest('FIND_NEAREST_MARKER', findNearestMarker);
	yield takeLatest('DELETE_MARKER', deleteMarker);
	yield takeLatest('UPDATE_MARKER_TYPE', updateMarkerType);
}

export default markerSaga;
