import {combineReducers} from 'redux';
import {loginReducer} from './loginReducer';

export default combineReducers({
	loginReducer
});
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
