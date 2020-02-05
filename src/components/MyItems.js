import React, {useReducer, useState, useEffect, useContext} from 'react';
import { Link, Router, Route, NavLink, Switch, useRouteMatch } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import NewItem from './NewItem';
import Axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function MyItems() {
    const {appState, dispatch} = useContext(AppContext);
    const [items, setItems] = useState([]);
    const userID = 5; //Needs to be updated with user id from app state
        
    useEffect(() => {
        axiosWithAuth()
	    .get(`https://african-market-lambda.herokuapp.com/users/${userID}/items`)
	    .then(res => {
            console.log('Item List:', res.data);
            setItems(res.data.items);
	    })
	    .catch(err => {
	        console.log('The data was not returned', err);
        })
        .finally(console.log("Finally:", items));
    }, [])	

	return (
		<div>
			<h1>Welcome to your Dashboard.</h1>                        
                {items.map(item => {
                    return <ItemCard key={item.id} item={item}/>
                })}
		</div>
	);
}
export default MyItems;