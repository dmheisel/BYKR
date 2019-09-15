import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAvgRating(action) {
	try {
		let response = yield axios.get(`/api/rating/avgRating/${action.payload}`);
		yield put({
			type: 'SET_SELECTED_MARKER_AVG_RATING',
			payload: response.data.rating
		});
	} catch (error) {
		console.log('error on fetching average rating from database: ', error);
	}
}

//fetches user rating from database to set into redux state
function* fetchUserRating(action) {
	try {
		let ratingResponse = yield axios.get(
			`/api/rating/userRating/${action.payload}`
		);
		yield put({
			type: 'SET_SELECTED_MARKER_USER_RATING',
			payload: ratingResponse.data.rating || 0
		});
	} catch (error) {
		console.log('error on fetching rating from database: ', error);
	}
}
//updates user rating in database and triggers fetch to set into redux state
function* updateUserRating(action) {
	try {
		yield axios.put(`/api/rating/${action.payload.id}`, {
			rating: action.payload.rating
		});
		yield put({ type: 'FETCH_USER_RATING', payload: action.payload.id });
		yield put({ type: 'FETCH_AVG_RATING', payload: action.payload.id });
	} catch (error) {
		console.log('error on updating rating in database: ', error);
	}
}

//sends new user rating to database, then triggers fetch to set into redux state
function* addUserRating(action) {
	try {
		yield axios.post(`/api/rating/${action.payload.id}`, {
			rating: action.payload.rating
		});
		yield put({ type: 'FETCH_USER_RATING', payload: action.payload.id });
		yield put({ type: 'FETCH_AVG_RATING', payload: action.payload.id });
	} catch (error) {
		console.log('error on adding rating in to database: ', error);
	}
}

function* ratingSaga() {
	yield takeLatest('FETCH_AVG_RATING', fetchAvgRating);
	yield takeLatest('FETCH_USER_RATING', fetchUserRating);
	yield takeLatest('ADD_USER_RATING', addUserRating);
	yield takeLatest('UPDATE_USER_RATING', updateUserRating);
}

export default ratingSaga;
