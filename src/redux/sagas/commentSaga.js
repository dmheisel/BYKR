import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchComments(action) {
	try {
		let commentResponse = yield axios.get(`/api/comment/${action.payload}`);
		yield put({ type: 'SET_SELECTED_MARKER_COMMENTS', payload: commentResponse.data });
	} catch (error) {
		console.log('error on fetching comments in saga: ', error);
	}
}

function* addUserComment(action) {
	try {
		yield axios.post(`/api/comment/${action.payload.locationId}`, action.payload);
		yield put({ type: 'FETCH_MARKER_DETAILS', payload: action.payload.locationId });
	} catch (error) {
		console.log('error on adding comment in saga: ', error);
	}
}
function* commentSaga() {
	yield takeLatest('ADD_USER_COMMENT', addUserComment);
	yield takeLatest('FETCH_COMMENTS', fetchComments);
}
export default commentSaga;
