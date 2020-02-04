import React, {useReducer, useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';

function Home() {
	const {appState, dispatch} = useContext(AppContext);
	return <h1>Welcome to your Dashboard.</h1>;
}

export default Home;
