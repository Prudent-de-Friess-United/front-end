import React, {useReducer, useState, useEffect, useContext} from 'react';
import AppContext from '../contexts/AppContext';
import ItemCard from './ItemCard';
import Axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Home() {
    const {appState, dispatch} = useContext(AppContext);
    const {items, setItems} = useState([]);
    
    
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
        .finally(console.log("Finally:", items));
    }, [])	

	return (
		<div>
			<h1>Welcome to your Dashboard.</h1>
                {[].map(item => {
                    return <ItemCard key={item.id} item={item}/>
                })}
		</div>
	);
}
export default Home;
