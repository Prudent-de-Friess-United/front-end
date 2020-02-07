import React, {useState, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
const NewItem = (props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [itemLocation, setItemLocation] = useState('');
	const [category, setCategory] = useState('');
	const [url, setUrl] = useState('');
	//will receive use id from global state

	const [valid, setValid] = useState(false);
	const [nameValid, setNameValid] = useState(true);
	const [descValid, setDescValid] = useState(true);
	const [priceValid, setPriceValid] = useState(true);
	const [locValid, setLocValid] = useState(true);
	const [catValid, setCatValid] = useState(true);
	const [urlValid, setUrlValid] = useState(true);
	const [show, setShow] = useState(false);

	const {appState, dispatch} = useContext(AppContext);

	const handleNameChanges = event => {
		setName(event.target.value);
		if (event.target.value.length > 2) {
			setNameValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setNameValid(false);
			setValid(false);
		}
	};
	const handleDescriptionChanges = event => {
		setDescription(event.target.value);
		if (event.target.value.length > 9) {
			setDescValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setDescValid(false);
			setValid(false);
		}
	};
	const handlePriceChanges = event => {
		setPrice(event.target.value);
		if (event.target.value > 0) {
			setPriceValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setPriceValid(false);
			setValid(false);
		}
	};
	const handleLocationChanges = event => {
		setItemLocation(event.target.value);
		if (event.target.value.length > 3) {
			setLocValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setLocValid(false);
			setValid(false);
		}
	};
	const handleCategoryChanges = event => {
		setCategory(event.target.value);
		if (event.target.value.length > 2) {
			setCatValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setCatValid(false);
			setValid(false);
		}
	};
	const handleUrlChanges = event => {
		setUrl(event.target.value);
		if (event.target.value.length > 9) {
			setUrlValid(true);
			if (
				nameValid &&
				descValid &&
				priceValid &&
				locValid &&
				catValid &&
				urlValid
			) {
				setValid(true);
				console.log('valid: true');
			}
		} else {
			setUrlValid(false);
			setValid(false);
		}
	};
	const resetForm = () => {
		setName('');
		setDescription('');
		setPrice('');
		setItemLocation('');
		setCategory('');
		setUrl('');
	};
	const handleSubmit = event => {
		event.preventDefault();
		dispatch({type: 'ADDITEM'});
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
				dispatch({type: 'ADDITEMSUCCESS'});
				setShow(false);
				resetForm();
				props.addCard(props.cardNum + 1);
			})
			.catch(err => console.log(err));
		//Not really needed just to touch state.
		dispatch({type: 'RESET'});
	};

	return (
		<Card>
			{show ? (
				<FormControl onSubmit={event => handleSubmit(event)}>
					<TextField
						id="itemName"
						label="Item Name"
						required
						error={!nameValid}
						value={name}
						onChange={handleNameChanges}
						helperText={
							nameValid ? '' : 'Must be at least three characters long'
						}
					/>
					<TextField
						id="itemDescription"
						label="Item Description"
						required
						error={!descValid}
						value={description}
						onChange={handleDescriptionChanges}
						helperText={descValid ? '' : 'Must be at least ten characters long'}
					/>
					<TextField
						id="itemPrice"
						label="Item Price"
						required
						error={!priceValid}
						value={price}
						onChange={handlePriceChanges}
						helperText={priceValid ? '' : 'Must be greater than zero'}
					/>
					<TextField
						id="itemLocation"
						label="Item Location"
						required
						error={!locValid}
						value={itemLocation}
						onChange={handleLocationChanges}
						helperText={locValid ? '' : 'Must be at least four characters long'}
					/>
					<TextField
						id="itemCategory"
						label="Item Category"
						required
						error={!catValid}
						value={category}
						onChange={handleCategoryChanges}
						helperText={
							catValid ? '' : 'Must be at least three characters long'
						}
					/>
					<TextField
						id="itemUrl"
						label="Item URL"
						required
						error={!urlValid}
						value={url}
						onChange={handleUrlChanges}
						helperText={urlValid ? '' : 'Must be at least ten characters long'}
					/>
					<Button onClick={handleSubmit} disabled={valid ? false : true}>
						Submit
					</Button>
					<Button
						onClick={() => {
							setShow(false);
						}}
					>
						{' '}
						Cancel
					</Button>
				</FormControl>
			) : (
				<Button
					onClick={() => {
						setShow(true);
					}}
				>
					{' '}
					<AddIcon />
					<Typography>New Item</Typography>
				</Button>
			)}
		</Card>
	);
};

export default NewItem;
