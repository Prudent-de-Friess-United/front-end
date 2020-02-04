import React, {useReducer, useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import Axios from 'axios';

function Home() {
	const {appState, dispatch} = useContext(AppContext);
	let items = {};
	// Axios
	//     .get('https://african-market-lambda.herokuapp.com/items/')
	//     .then(res => {
	//         console.log(res);
	//     })
	//     .catch(err => {
	//         console.log('The data was not returned', err);
	//     });

	return (
		<div>
			<h1>Welcome to your Dashboard.</h1>
			<ItemCard />
		</div>
	);
}
export default Home;
