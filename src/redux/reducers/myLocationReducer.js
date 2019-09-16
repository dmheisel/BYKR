import { combineReducers } from 'redux';

const mySaved = (state = [], action) => {
	switch (action.type) {
		case 'SET_USER_FAVORITES':
			return action.payload;
		default:
			return state;
	}
};

const myCreated = (state = [], action) => {
	switch (action.type) {
		case 'SET_USER_CREATED':
			return action.payload;
		default:
			return state;
	}
};

export default combineReducers({
	mySaved,
	myCreated
});
