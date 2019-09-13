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

function* fetchLocationTypes() {
	//gets all types of locations from the database and stores in redux state
	try {
		let response = yield axios.get('/api/locations/types');
		yield put({ type: 'SET_LOCATION_TYPES', payload: response.data });
	} catch (error) {
		console.log('error on fetching list of location types');
	}
}

function* fetchLocationDetails(action) {
	//gets all location comments and average rating from database to store in redux state
	try {
		let commentsResponse = yield axios.get(
			`/api/locations/comments/${action.payload}`
		);
		let ratingsResponse = yield axios.get(
			`/api/locations/rating/${action.payload}`
		);
		yield put({
			type: 'SET_DISPLAYED_LOCATION',
			payload: {
				id: commentsResponse.data.id,
				location_type: commentsResponse.data.location_type_id,
				comments: {
					comment: commentsResponse.data.user_comments,
					id: commentsResponse.data.user_ids
				},
				rating: ratingsResponse.data.avg_rating
			}
		});
	} catch (error) {
		console.log('error on fetching location comments and ratings', error);
	}
}

function* addLocation(action) {
	//add location to database
	try {
		yield axios.post('/api/locations', action.payload);
		yield put({ type: 'FETCH_LOCATIONS' });
	} catch (error) {
		console.log('error on saga sending location to server');
	}
}

function* locationSaga() {
	yield takeLatest('FETCH_LOCATIONS', fetchLocations);
	yield takeLatest('ADD_LOCATION', addLocation);
	yield takeLatest('FETCH_LOCATION_TYPES', fetchLocationTypes);
	yield takeLatest('FETCH_LOCATION_DETAILS', fetchLocationDetails);
}

export default locationSaga;
