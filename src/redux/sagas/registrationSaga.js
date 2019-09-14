import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
	try {
		// clear any existing error on the registration page
		yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

		//adds user to db user table, retrieves back user_id
		let response = yield axios.post('/api/user/register', action.payload);

		//gets coords from google geocode api
		let coordsResponse = yield axios.get(
			`api/geocode/coords/${action.payload.location}`
		);

		//sends user id and coords to settings table
		yield axios.post('/api/account', {
			user_id: response.data.id,
			location: action.payload.location,
			coords: coordsResponse.data
		});

		// automatically log a user in after registration
		yield put({ type: 'LOGIN', payload: action.payload });
		// set to 'login' mode so they see the login screen
		// after registration or after they log out
		yield put({ type: 'SET_TO_LOGIN_MODE' });
	} catch (error) {
		console.log('Error with user registration:', error);
		yield put({ type: 'REGISTRATION_FAILED' });
	}
}

function* registrationSaga() {
	yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
