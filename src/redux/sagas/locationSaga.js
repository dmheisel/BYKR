import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchLocationDetails(action) {
	//gets all location comments and average rating from database to store in redux state
	try {
		let commentsResponse = yield axios.get(
			`/api/locations/comments/${action.payload}`
		);
		let ratingsResponse = yield axios.get(
			`/api/locations/rating/${action.payload}`
		);
		yield put({ type: 'FETCH_USER_RATING', payload: action.payload });
		yield put({
			type: 'SET_DISPLAYED_LOCATION',
			payload: {
				id: commentsResponse.data.id,
				address: commentsResponse.data.address,
				location_type: commentsResponse.data.location_type_id,
				created_by_user_id: commentsResponse.data.created_by_user_id,
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
		let response = yield axios.get(
			`api/geocode/address/${action.payload.coords.lat},${action.payload.coords.lng}`
		);
		yield console.log(response);
		yield axios.post('/api/locations', {
			...action.payload,
			address: response.data
		});
		yield put({ type: 'FETCH_LOCATIONS' });
	} catch (error) {
		console.log('error on saga sending location to server');
	}
}

function* saveLocation(action) {
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

function* unSaveLocation(action) {
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
	yield takeLatest('ADD_LOCATION', addLocation);
	yield takeLatest('FETCH_LOCATION_DETAILS', fetchLocationDetails);
	yield takeLatest('ADD_SAVED_LOCATION', saveLocation);
	yield takeLatest('REMOVE_SAVED_LOCATION', unSaveLocation);
}

export default locationSaga;
