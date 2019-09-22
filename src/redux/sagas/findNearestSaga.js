import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

function* findNearestMarker(action) {
	try {
		//if not looking for third party type of location, gets result from database
		if (!action.payload.is_third_party) {
			const closest = yield axios.get(
				`/api/nearest?filter=${action.payload.id}&currentLoc=${action.payload.coords}`
			);
			console.log(closest.data);
			yield put({
				type: 'SET_CENTER',
				payload: {
					lat: Number(closest.data.lat),
					lng: Number(closest.data.lng)
				}
			});
		} else {
			//if looking for third party, gets from third party url (niceride) and sorts that
			let response = yield axios.get(
				`https://gbfs.niceridemn.com/gbfs/en/station_information.json`
			);
			//sorts list by distance from lat to lng in list and returns the one with lowest value
			const closest = yield response.data.data.stations.sort((a, b) => {
				return (
					Math.abs(Number(action.payload.user.lat) - a.lat) +
					Math.abs(Number(action.payload.user.lng) - a.lon) -
					(Math.abs(Number(action.payload.user.lat) - b.lat) +
						Math.abs(Number(action.payload.user.lng) - b.lon))
				);
			})[0];
			console.log('sorted by closest: ', closest);
			//setting api marker list shows icon on map
			yield put({ type: 'SET_API_MARKERS', payload: [closest] });
			//setting center pans map to that location
			yield put({
				type: 'SET_CENTER',
				payload: { lat: closest.lat, lng: closest.lon }
			});
		}
	} catch (error) {
		console.log('error on finding closest location: ', error);
	}
}

function* findNearestSaga() {
	yield takeLatest('FIND_NEAREST_MARKER', findNearestMarker);
}
export default findNearestSaga;
