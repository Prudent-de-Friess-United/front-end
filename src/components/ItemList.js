import React, {useState, useEffect, useContext} from 'react';
//import {Link, Router, Route, NavLink, Switch, useRouteMatch} from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import NewItem from './NewItem';
import {axiosWithAuth} from '../utils/axiosWithAuth';

function ItemList() {
	const {appState, dispatch} = useContext(AppContext);
	const [items, setItems] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get('https://african-market-lambda.herokuapp.com/items/')
			.then(res => {
				console.log('Item List:', res.data);
				setItems(res.data);
			})
			.catch(err => {
				console.log('The data was not returned', err);
			})
			.finally(console.log('Finally:', items));
	}, []);

	return (
		<div>
			<h1>Welcome to your Dashboard.</h1>
			{items.map(item => {
				console.log(item);
				return <ItemCard key={item.id} item={item} />;
			})}
		</div>
	);
}
export default ItemList;
