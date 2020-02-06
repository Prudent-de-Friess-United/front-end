import React, {useReducer} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import NewItem from './components/NewItem';
import ItemList from './components/ItemList';
import MyItems from './components/MyItems';

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
					{/* The routes below need to be private routes and only be displayed when the use is logged in */}
					<Route path={`/user-home/add-item`}>
						<Home />
						<NewItem />
					</Route>
					<Route path="/user-home/item-list">
						<Home />
						<ItemList />
					</Route>
					<Route path="/user-home/my-items">
						<Home />
						<MyItems />
					</Route>
				</div>
			</Router>
		</AppContext.Provider>
	); 
}

export default App;
