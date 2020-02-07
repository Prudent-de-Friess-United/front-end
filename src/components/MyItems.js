import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import NewItem from './NewItem';
import {Typography} from '@material-ui/core';

function MyItems() {
	const {appState, dispatch} = useContext(AppContext);
	const [items, setItems] = useState([]);
	const [newCard, setNewCard] = useState(0);
	const userID = appState.login.user_id; //Needs to be updated with user id from app state	

	useEffect(() => {
		console.log('PreAxios user id from state', userID);
		axiosWithAuth()
			.get(`https://african-market-lambda.herokuapp.com/users/${userID}/items`)
			.then(res => {
				console.log('Item List:', res.data);
				setItems(res.data.items);
			})
			.catch(err => {
				console.log('The data was not returned', err);
			})
			.finally(console.log('Finally:', items));
	}, [newCard]);

	return (
		<div>
			<Typography variant="h5" component="h2">
				My Posted Items:
			</Typography>
			<NewItem cardNum={newCard} addCard={setNewCard} />
			{items.map(item => {
				return <ItemCard key={item.id} item={item} />;
			})}
		</div>
	);
}
export default MyItems;
