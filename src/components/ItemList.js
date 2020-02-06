import React, {useState, useEffect} from 'react';
import ItemCard from './ItemCard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import TextField from '@material-ui/core/TextField';

function ItemList() {
	//const {appState, dispatch} = useContext(AppContext);
	const [items, setItems] = useState([]);
	const [search, setSearch] = useState('');
	const [searched, setSearched] = useState(false);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const searchResults = items.filter(item =>
			item.name.toLowerCase().includes(search.toLowerCase())
		);
		setResults(searchResults);
	}, [search]);

	const handleSearchChanges = event => {
		setSearch(event.target.value);
		if (event.target.value === '') {
			setSearched(false);
		} else {
			setSearched(true);
		}
	};

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
			<TextField
				id="search"
				label="Search"
				value={search}
				onChange={handleSearchChanges}
			></TextField>
			{(!searched ? items : results).map(item => {
				// console.log(item);
				return <ItemCard key={item.id} item={item} />;
			})}
		</div>
	);
}
export default ItemList;
