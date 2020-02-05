import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import {makeStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import {axiosWithAuth} from '../utils/axiosWithAuth';

import {Link, withRouter, Redirect} from 'react-router-dom';

//material ui
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {FormControlLabel} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 300
	},
	title: {
		fontSize: 16
	},
	pos: {
		marginBottom: 12
	}
});

const dummyItem = {
	name: 'Shoes',
	description: 'Running Shoes',
	price: '456',
	location: 'Congo',
	category: 'Clothing',
	URL: 'https://fake.url',
	user_id: 5
};

export default function ItemCard(props) {
	const {appState, dispatch} = useContext(AppContext);
	const [item, setItem] = useState(dummyItem);
	const [cardOwner, setCardOwner] = useState({});
	const [editing, setEditing] = useState(false);
	const [itemPending, setItemPending] = useState({});

	const classes = useStyles();
	useEffect(() => {
		//console.log('Before adding user name', props.item.user_id);
		axiosWithAuth()
			.get(
				`https://african-market-lambda.herokuapp.com/users/${props.item.user_id}`
			)
			.then(res => {
				//console.log('user of card:', res.data);
				setCardOwner(res.data);
			})
			.catch(err => {
				console.log('The data was not returned', err);
			});
	}, [props.item.user_id]);

	const toggleEdit = () => {
		editing ? setEditing(false) : setEditing(true);
	};

	//To edit the card

	const handleChanges = e => {
		if (e.target.id === 'itemName') {
			setItemPending({
				...itemPending,
				name: e.target.value
			});
		} else if (e.target.id === 'itemDescription') {
			setItemPending({
				...itemPending,
				description: e.target.value
			});
		} else if (e.target.id === 'itemPrice') {
			setItemPending({
				...itemPending,
				price: e.target.value
			});
		} else if (e.target.id === 'itemLocation') {
			setItemPending({
				...itemPending,
				location: e.target.value
			});
		} else if (e.target.id === 'itemCategory') {
			setItemPending({
				...itemPending,
				category: e.target.value
			});
		} else if (e.target.id === 'itemUrl') {
			setItemPending({
				...itemPending,
				URL: e.target.value
			});
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.put(
				`https://african-market-lambda.herokuapp.com/items/${props.item.id}`,
				{
					name: itemPending.name,
					description: itemPending.description,
					price: itemPending.price,
					location: itemPending.itemLocation,
					category: itemPending.category,
					URL: itemPending.url,
					user_id: appState.login.user_id
				}
			)
			.then(res => {
				console.log(res);
				setItemPending({});
			})
			.catch(err => console.log(err));
	};

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{props.item.name}
				</Typography>
				<Typography variant="h5" component="h2">
					Description: {props.item.description}
				</Typography>
				<Typography>Price: ${props.item.price}</Typography>
				<Typography>Country: {props.item.location}</Typography>
				<Typography>Category: {props.item.category}</Typography>
				<Typography>Posted by: {cardOwner.username}</Typography>
				{props.item.user_id == appState.login.user_id ? (
					<Button onClick={() => toggleEdit()}>Edit Card</Button>
				) : (
					<p>User type: {cardOwner.department}</p>
				)}
				{editing ? (
					<Container>
						<FormControl onSubmit={event => handleSubmit(event)}>
							<TextField
								id="itemName"
								label="Item Name"
								value={itemPending.name}
								onChange={handleChanges}
							/>
							<TextField
								id="itemDescription"
								label="Item Description"
								value={itemPending.description}
								onChange={handleChanges}
							/>
							<TextField
								id="itemPrice"
								label="Item Price"
								value={itemPending.price}
								onChange={handleChanges}
							/>
							<TextField
								id="itemLocation"
								label="Item Location"
								value={itemPending.itemLocation}
								onChange={handleChanges}
							/>
							<TextField
								id="itemCategory"
								label="Item Category"
								value={itemPending.category}
								onChange={handleChanges}
							/>
							<TextField
								id="itemUrl"
								label="Item URL"
								value={itemPending.url}
								onChange={itemPending.handleChanges}
							/>
							<Button onClick={handleSubmit}>Submit</Button>
						</FormControl>
					</Container>
				) : (
					<></>
				)}
			</CardContent>
		</Card>
	);
}
