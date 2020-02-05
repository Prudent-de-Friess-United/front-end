import React from 'react';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';

const NewItem = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [category, setCategory] = useState('');
	const [url, setUrl] = useState('');
	//will receive use id from global state

	const {appState, dispatch} = useContext(AppContext);
	// {
	//     name: 'Shoes',
	//     description: 'Running Shoes',
	//     price: '456',
	//     location: 'Congo',
	//     category: 'Clothing',
	//     URL: 'https://fake.url',
	//     user_id: 5
	// }
	const handleNameChanges = el => {
		switch (el.target.name) {
			case '':
				break;
			case '':
				break;
			case '':
				break;
			default:
				return;
		}
		setName(el.target.value);
	};
	const handleAgeChanges = el => {
		setAge(el.target.value);
	};
	const handleHeightChanges = el => {
		setHeight(el.target.value);
	};

	const handleSubmit = el => {
		el.preventDefault();
		console.log('Submitted Items', {
			name: name,
			age: age,
			height: `${height} cm`,
			id: Date.now()
		});
		const base_url = 'http://localhost:3333/smurfs';
		axios
			.post(base_url, {
				name: name,
				age: age,
				height: `${height} cm`
			})
			.then(res => {
				console.log(res);
				dispatch({type: 'UPDATE_STATE', payload: res.data});
			})
			.catch(err => console.log(err));
		dispatch({
			type: 'ADD_ITEM',
			payload: {
				//PAYLOAD GOES HERE
			}
		});
		setName('');
		setAge('');
		setHeight('');
		console.log(appState);
	};

	return (
		<Container>
			<form onSubmit={el => handleSubmit(el)}>
				<TextField
					id="SmurfName"
					label="Smurf Name"
					variant="outlined"
					value={name}
					onChange={handleNameChanges}
				/>
				<TextField
					id="SmurfAge"
					label="Smurf Age"
					variant="outlined"
					value={age}
					onChange={handleAgeChanges}
				/>
				<TextField
					id="SmurfHeight"
					label="Smurf Height in cm"
					variant="outlined"
					value={height}
					onChange={handleHeightChanges}
				/>
				<Button onClick={handleSubmit}>Submit</Button>
			</form>
		</Container>
	);
};

export default NewItem;
