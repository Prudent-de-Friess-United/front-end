import React, {useReducer} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import {Link} from 'react-router-dom';

import AppContext from './contexts/AppContext';
import {reducer, initialState} from './reducers/index';

function App() {
	const [appState, dispatch] = useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={{appState, dispatch}}>
			<Router>
				<Navbar />
				<div className="App">
					<Route exact path="/">
						<Landing />
					</Route>
					<Route path="/sign-up">
						<Signup />
					</Route>
					<Route path="/sign-in">
						<Login />
					</Route>
					<Route path="/user-home">
						<Home />
					</Route>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
