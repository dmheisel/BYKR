import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './redux/reducers'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js
import App from './components/App/App.jsx';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00c8f8'
		},
		secondary: {
			main: '#e61610'
		},
		background: {
			primary: {
				main: '#c8e6c9'
			},
			secondary: {
				main: '#00c8f8'
			}
		}
	},
	status: {
		danger: '#e61610'
	}
});

//creates sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// logger will only be added to your project if your in development mode
const middlewareList =
	process.env.NODE_ENV === 'development'
		? [sagaMiddleware, logger]
		: [sagaMiddleware];

const store = createStore(
	rootReducer,
	// adds all middleware to our project including saga and logger
	applyMiddleware(...middlewareList)
);

// tells the saga middleware to use the rootSaga - rootSaga contains all other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('react-root')
);
