import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* updateCenter(action) {
	try {
		let response = yield axios.get(`/api/geocode/coords/${action.payload}`);
		yield put({ type: 'SET_CENTER', payload: response.data });
	} catch (error) {
		console.log('error on fetchCenter saga: ', error);
	}
}

const getUserLocation = () =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			loc => resolve(loc),
			err => reject(err),
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
		);
	});

// function to determine center of map (used if user allows acces to device location)
function* fetchCenter(action) {
	try {
		const currentLocation = yield call(getUserLocation);
		yield put({
			type: 'UPDATE_USER_DEFAULT_LOCATION',
			payload: {...action.payload, coords: {
				lat: currentLocation.coords.latitude,
				lng: currentLocation.coords.longitude
			}}
		});
	} catch (error) {}
}

function* mapSaga() {
	yield takeLatest('UPDATE_CENTER', updateCenter);
	yield takeLatest('FETCH_CENTER', fetchCenter);
}
export default mapSaga;
