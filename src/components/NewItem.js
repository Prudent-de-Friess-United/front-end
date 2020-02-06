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

	const [valid, setValid] = useState(false);
	const [nameValid, setNameValid] = useState(false);
	const [descValid, setDescValid] = useState(false);
	const [priceValid, setPriceValid] = useState(false);
	const [locValid, setLocValid] = useState(false);
	const [catValid, setCatValid] = useState(false);
	const [urlValid, setUrlValid] = useState(false);

	const {appState, dispatch} = useContext(AppContext);

	const handleNameChanges = event => {
		setName(event.target.value);
		if (event.target.value.length > 4){
			setNameValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setNameValid(false);
			setValid(false);
		}
	};
	const handleDescriptionChanges = event => {
		setDescription(event.target.value);
		if (event.target.value.length > 10){
			setDescValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setDescValid(false);
			setValid(false);
		}
	};
	const handlePriceChanges = event => {
		setPrice(event.target.value);
		if (event.target.value>0){
			setPriceValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setPriceValid(false);
			setValid(false);
		}
	};
	const handleLocationChanges = event => {
		setItemLocation(event.target.value);
		if (event.target.value.length > 4){
			setLocValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setLocValid(false);
			setValid(false);
		}
	};
	const handleCategoryChanges = event => {
		setCategory(event.target.value);
		if (event.target.value.length > 4){
			setCatValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setCatValid(false);
			setValid(false);
		}
	};
	const handleUrlChanges = event => {
		setUrl(event.target.value);
		if (event.target.value.length > 4){
			setUrlValid(true);
			if (nameValid && descValid && priceValid && locValid && catValid && urlValid) {
				setValid(true);	
				console.log('valid: true')			
			}
		} else {
			setUrlValid(false);
			setValid(false);
		}
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
					required
					error={!nameValid}
					value={name}
					onChange={handleNameChanges}
				/>
				<TextField
					id="itemDescription"
					label="Item Description"
					required
					error={!descValid}
					value={description}
					onChange={handleDescriptionChanges}
				/>
				<TextField
					id="itemPrice"
					label="Item Price"
					required
					error={!priceValid}
					value={price}
					onChange={handlePriceChanges}
				/>
				<TextField
					id="itemLocation"
					label="Item Location"
					required
					error={!locValid}
					value={itemLocation}
					onChange={handleLocationChanges}
				/>
				<TextField
					id="itemCategory"
					label="Item Category"
					required
					error={!catValid}					
					value={category}
					onChange={handleCategoryChanges}
				/>
				<TextField
					id="itemUrl"
					label="Item URL"
					required
					error={!urlValid}
					value={url}
					onChange={handleUrlChanges}
				/>
				<Button onClick={handleSubmit} disabled={(valid?false:true)}>Submit</Button>
			</FormControl>
		</Container>
	);
};

export default NewItem;
