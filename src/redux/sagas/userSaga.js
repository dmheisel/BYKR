import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		};
		// the config includes credentials which allow the server session to recognize the user
		// If a user is logged in, this will return their information from the server session (req.user)
		const response = yield axios.get('/api/user', config);
		const accountDetailsResponse = yield axios.get(
			`/api/account/${response.data.id}`
		);
		// now that the session has given us a user object with an id and username set
		//the client - side user object to let the client-side code know the user is logged in
		yield put({
			type: 'SET_USER',
			payload: {
				...response.data,
				default_location: accountDetailsResponse.data.default_location,
				saved_locations: accountDetailsResponse.data.saved_locations,
				lat: accountDetailsResponse.data.lat,
				lng: accountDetailsResponse.data.lng
			}
		});
	} catch (error) {
		console.log('User get request failed', error);
	}
}

function* updateUserDefaultLocation(action) {
	try {
		let newCoordsResponse = yield axios.get(
			`/api/geocode/coords/${action.payload.newLocation}`
		);
		yield axios.put(`/api/account/${action.payload.id}`, {
			...action.payload,
			coords: newCoordsResponse.data
		});
		yield put({ type: 'FETCH_USER' });
	} catch (error) {
		console.log('Update settings request failed', error);
	}
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeLatest('UPDATE_USER_DEFAULT_LOCATION', updateUserDefaultLocation);
}

export default userSaga;
