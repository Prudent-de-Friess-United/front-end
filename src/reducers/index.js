export const initialState = {
	login: {
		loginLoading: false,
		loginSuccess: false,
		user_id: '',
		message: ''
	}
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGINFETCH':
			return {
				...state,
				login: {
					...state,
					loginLoading: true,
					loginSuccess: false
				}
			};
		case 'LOGINSUCCESS':
			return {
				...state,
				loginLoading: false,
				loginSuccess: true,
				user: action.payload.id,
				message: action.payload.message
			};
		case 'LOGINFAILURE':
			return {
				...state,
				loginLoading: false,
				loginSuccess: false,
				user: '',
				message: ''
			};
		default:
			return state;
	}
};

// export const reducer = (state, action) => {
// 	switch (action.type) {
// 		case 'ADD_ITEM':
// 			console.log('Added item to state');
// 			return {...state, smurfs: [...state.smurfs, action.payload]};
// 		case 'UPDATE_STATE':
// 			return {...state, smurfs: action.payload};
// 		case 'SEND_TO_GULAG':
// 			console.log(`Item Clicked with id ${action.payload}`);
// 			if (state.smurfs.find(el => action.payload === el.id)) {
// 				console.log('Smurf processed');
// 			} else {
// 				console.log('Smurf Bribed Guard!');
// 			}
// 			return {
// 				...state,
// 				smurfs: state.smurfs.filter(element => element.id !== action.payload)
// 			};
// 		default:
// 			return state;
// 	}
// };

// import {
// 	FETCHING_DATA_START,
// 	FETCHING_DATA_SUCCESS,
// 	FETCHING_ACTIVITY_FAILURE
// } from '../actions';

// const initialState = {
// 	isLoading: false,
// 	data: null,
// 	error: ''
// };

// export const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case FETCHING_DATA_START:
// 			//console.log(state)
// 			return {
// 				...state,
// 				isLoading: true
// 			};
// 		case FETCHING_DATA_SUCCESS:
// 			//console.log(state)
// 			return {
// 				...state,
// 				isLoading: false,
// 				data: action.payload
// 			};
// 		default:
// 			return state;
// 	}
// };
