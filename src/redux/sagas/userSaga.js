import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

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
		console.log('update location triggered');
		let newCoordsResponse;
		if (!action.payload.coords) {
			let coordsResponse = yield axios.get(
				`/api/geocode/coords/${action.payload.newLocation}`
			);
			action.payload.coords = coordsResponse.data
		}
		yield axios.put(`/api/account/${action.payload.id}`, action.payload);

		yield put({ type: 'FETCH_USER' });
		yield put({
			type: 'SET_CENTER',
			payload: action.payload.coords || newCoordsResponse.data
		});
	} catch (error) {
		console.log('Update settings request failed', error);
	}
}
//creates a promise to resolve on getting user's current device location
const getUserLocation = () =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			loc => resolve(loc),
			err => reject(err),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
		);
	});
//saga to update user's device location setting in db table
function* updateUserDeviceSetting(action) {
	try {
		yield axios.put(`/api/account/useDevice/${action.payload.id}`, {
			newSetting: action.payload.newSetting
		});
		if (action.payload.newSetting === true) {
			console.log('gathering coordinates from device, please wait...');
			const location = yield call(getUserLocation);
			yield console.log(location.coords);
			let addressResponse = yield axios.get(
				`/api/geocode/address/${location.coords.latitude},${location.coords.longitude}`
			);
			yield put({
				type: 'UPDATE_USER_DEFAULT_LOCATION',
				payload: {
					...action.payload,
					newLocation: addressResponse.data.address,
					coords: {
						lat: location.coords.latitude,
						lng: location.coords.longitude
					}
				}
			});
		} else {
			yield put({ type: 'FETCH_USER' });
		}
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
