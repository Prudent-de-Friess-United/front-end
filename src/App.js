import React, {useReducer} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import HomeLogin from './components/HomeLogin';
import Login from './components/Login';
import NewItem from './components/NewItem';
import ItemList from './components/ItemList';
import MyItems from './components/MyItems';
import Container from '@material-ui/core/Container'
import AppContext from './contexts/AppContext';
import {reducer, initialState} from './reducers/index';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {
	const [appState, dispatch] = useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={{appState, dispatch}}>
			<Router>
				<Navbar login={appState.login.loginSuccess} />
				<div className="App">
					<Route exact path="/">
						{!appState.login.loginSuccess ? <HomeLogin history={history} /> : <Landing />}						
					</Route>
					<Route path="/sign-up">
						<Signup />
					</Route>
					<Route path="/sign-in">
						{!appState.login.loginSuccess ? <HomeLogin /> : <Landing />}
					</Route>
					<Route exact path="/user-home">
						<Landing />
					</Route>
					{/* The routes below need to be private routes and only be displayed when the use is logged in */}
					<Route path="/user-home/item-list">
						<Container>
							<ItemList />
						</Container>
					</Route>
					<Route path="/user-home/my-items">
					<Container>
						<MyItems />
					</Container>
					</Route>
				</div>
			</Router>
		</AppContext.Provider>
	);
}

export default App;
