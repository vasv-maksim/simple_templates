import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import mainReduser from './store/mainReduser.js';
import App from './components/App/index';
import './index.css';
import { save } from 'redux-localstorage-simple';
 
// const store = createStore(mainReduser);
const  configureStore = preloadedState => (createStore(mainReduser, preloadedState, applyMiddleware(save({namespace: 'test'}))))

const store = configureStore({});

const mapStateToProps = (state) => {
	console.log("Store", state)
	return {
		test: state.payload
	}
};

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>, 
	document.getElementById('root')
	);