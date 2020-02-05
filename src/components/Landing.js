import React, {useReducer, useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';

function Landing() {
	const {appState, dispatch} = useContext(AppContext);
	return (
		<h1>
			Sell your goods across the East African Community safely and at the best
			prices.
		</h1>
	);
}

export default Landing;
