import React, {useState, useEffect} from 'react';
import ItemCard from './ItemCard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {InputAdornment, Typography} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function ItemList() {
	//const {appState, dispatch} = useContext(AppContext);
	const [items, setItems] = useState([]);
	const [search, setSearch] = useState('');
	const [searched, setSearched] = useState(false);
	const [results, setResults] = useState([]);
	const [searchType, setSearchType] = useState('name');

	useEffect(() => {
		if (searchType === 'name') {
			const searchResults = items.filter(item =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
			setResults(searchResults);
		} else if (searchType === 'category') {
			const searchResults = items.filter(item =>
				item.category.toLowerCase().includes(search.toLowerCase())
			);
			setResults(searchResults);
		} else if (searchType === 'location') {
			const searchResults = items.filter(item =>
				item.location.toLowerCase().includes(search.toLowerCase())
			);
			setResults(searchResults);
		}
	}, [search]);

	const handleSearchChanges = event => {
		setSearch(event.target.value);
		if (event.target.value === '') {
			setSearched(false);
		} else {
			setSearched(true);
		}
	};

	const handleTypeChange = event => {
		setSearchType(event.target.value);
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
			<Typography component="h2">Items for Sale: </Typography>
			<FormLabel component="legend">Search</FormLabel>
			<RadioGroup
				aria-label="search"
				name="searchType"
				value={searchType}
				onChange={handleTypeChange}
			>
				<FormControlLabel value="name" control={<Radio />} label="By Name" />
				<FormControlLabel
					value="category"
					control={<Radio />}
					label="By Category"
				/>
				<FormControlLabel
					value="location"
					control={<Radio />}
					label="By Country"
				/>
			</RadioGroup>
			<TextField
				id="search"
				label="Search"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					)
				}}
				value={search}
				onChange={handleSearchChanges}
			></TextField>
			{(!searched ? items : results).map(item => {
				console.log(item);
				return <ItemCard key={item.id} item={item} />;
			})}
		</div>
	);
}
export default ItemList;
