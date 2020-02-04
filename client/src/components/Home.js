import React, {useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import Axios from 'axios';


function Home() {
    let items = {}

    // Axios
    //     .get('https://african-market-lambda.herokuapp.com/items/')
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log('The data was not returned', err);
    //     });

    return (
        <div>
            <h1>Welcome to your Dashboard.</h1>
            <ItemCard/>
        </div>        
    )
}

export default Home;