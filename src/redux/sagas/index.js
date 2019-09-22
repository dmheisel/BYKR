import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import selectedMarkerSaga from './selectedMarkerSaga';
import mapSaga from './mapSaga';
import markerSaga from './markerSaga';
import ratingSaga from './ratingSaga';
import commentSaga from './commentSaga'
import myLocationSaga from './myLocationsSaga'
import findNearestSaga from './findNearestSaga'

// rootSaga is the primary saga.

export default function* rootSaga() {
	yield all([
		loginSaga(),
		registrationSaga(),
		userSaga(),
		selectedMarkerSaga(),
		mapSaga(),
		markerSaga(),
		ratingSaga(),
		commentSaga(),
		myLocationSaga(),
		findNearestSaga(),
	]);
}
