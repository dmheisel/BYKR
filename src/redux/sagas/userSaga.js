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
		console.log(response.data);
		const accountDetailsResponse = yield axios.get(
			`/api/account/${response.data.id}`
		);
		console.log(accountDetailsResponse.data);
		// now that the session has given us a user object with an id and username set
		//the client - side user object to let the client-side code know the user is logged in
		yield put({
			type: 'SET_USER',
			payload: {
				...response.data,
				...accountDetailsResponse.data
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
		yield put({ type: 'SET_CENTER', payload: newCoordsResponse.data });
	} catch (error) {
		console.log('Update settings request failed', error);
	}
}

//saga to update user's device location setting in db table
function* updateUserDeviceSetting(action) {
	try {
		yield axios.put(`/api/account/useDevice/${action.payload.id}`, {newSetting: action.payload.newSetting});
		yield put({ type: 'FETCH_USER' });
	} catch (error) {
		console.log('error on updating user device permission: ', error);
	}
}

function* userSaga() {
	yield takeLatest('FETCH_USER', fetchUser);
	yield takeLatest('UPDATE_USER_DEFAULT_LOCATION', updateUserDefaultLocation);
	yield takeLatest('UPDATE_USER_DEVICE_SETTING', updateUserDeviceSetting);
}

export default userSaga;
