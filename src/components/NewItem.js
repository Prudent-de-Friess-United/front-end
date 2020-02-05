import React, {useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {Link, withRouter, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {FormControlLabel} from '@material-ui/core';

const NewItem = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [itemLocation, setItemLocation] = useState('');
	const [category, setCategory] = useState('');
	const [url, setUrl] = useState('');
	//will receive use id from global state

	const {appState, dispatch} = useContext(AppContext);

	const handleNameChanges = event => {
		setName(event.target.value);
	};
	const handleDescriptionChanges = event => {
		setDescription(event.target.value);
	};
	const handlePriceChanges = event => {
		setPrice(event.target.value);
	};
	const handleLocationChanges = event => {
		setItemLocation(event.target.value);
	};
	const handleCategoryChanges = event => {
		setCategory(event.target.value);
	};
	const handleUrlChanges = event => {
		setUrl(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post('https://african-market-lambda.herokuapp.com/items/additem', {
				name: name,
				description: description,
				price: price,
				location: itemLocation,
				category: category,
				URL: url,
				user_id: appState.login.user_id
			})
			.then(res => {
				console.log(res);
				dispatch({type: 'UPDATE_STATE', payload: res.data});
			})
			.catch(err => console.log(err));
	};

	return (
		<Container>
			<FormControl onSubmit={event => handleSubmit(event)}>
				<TextField
					id="itemName"
					label="Item Name"
					value={name}
					onChange={handleNameChanges}
				/>
				<TextField
					id="itemDescription"
					label="Item Description"
					value={description}
					onChange={handleDescriptionChanges}
				/>
				<TextField
					id="itemPrice"
					label="Item Price"
					value={price}
					onChange={handlePriceChanges}
				/>
				<TextField
					id="itemLocation"
					label="Item Location"
					value={itemLocation}
					onChange={handleLocationChanges}
				/>
				<TextField
					id="itemCategory"
					label="Item Category"
					value={category}
					onChange={handleCategoryChanges}
				/>
				<TextField
					id="itemUrl"
					label="Item URL"
					value={url}
					onChange={handleUrlChanges}
				/>
				<Button onClick={handleSubmit}>Submit</Button>
			</FormControl>
		</Container>
	);
};

export default NewItem;
