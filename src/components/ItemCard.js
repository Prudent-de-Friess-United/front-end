import React, {useState, useEffect, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import {makeStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import {axiosWithAuth} from '../utils/axiosWithAuth';
//material ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

export default function ItemCard(props) {
	const {appState, dispatch} = useContext(AppContext);
	const [cardOwner, setCardOwner] = useState({});
	const [editing, setEditing] = useState(false);
	const [itemPending, setItemPending] = useState(props.item);
	const [itemDeleted, setItemDeleted] = useState(false);

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

	const deleteItem = () => {
		axiosWithAuth()
			.delete(
				`https://african-market-lambda.herokuapp.com/items/${props.item.id}`
			)
			.then(res => {
				console.log('Item deleted', res);
				setItemPending({});
				setItemDeleted(true);
			})
			.catch(err => console.log(err));
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
					location: itemPending.location,
					category: itemPending.category,
					URL: itemPending.url,
					user_id: appState.login.user_id
				}
			)
			.then(res => {
				console.log(res);
				setEditing(false);
			})
			.catch(err => console.log(err));
	};

	return (
		<Card className={classes.root} variant="outlined">
			{!itemDeleted ? (
				<CardContent>
					<Typography
						className={classes.title}
						color="primary"
						gutterBottom
					>
						{props.item.name}
					</Typography>
					<Typography variant="h5" component="h2">
						Description: {itemPending.description}
					</Typography>
					<Typography>Price: ${itemPending.price}</Typography>
					<Typography>Country: {itemPending.location}</Typography>
					<Typography>Category: {itemPending.category}</Typography>
					<Typography>Posted by: {cardOwner.username}</Typography>
					{props.item.user_id == appState.login.user_id ? (
						<Button onClick={() => toggleEdit()}>Edit Card</Button>
					) : (
						<p>User type: {cardOwner.department}</p>
					)}
					{editing ? (
						<>
							<Button onClick={() => deleteItem()}>Delete</Button>
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
										value={itemPending.location}
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
						</>
					) : (
						<></>
					)}
				</CardContent>
			) : (
				<Typography
					className={classes.title}
					color="textSecondary"
					variant="h5"
					component="h2"
				>
					{' '}
					Card Deleted{' '}
				</Typography>
			)}
		</Card>
	);
}
