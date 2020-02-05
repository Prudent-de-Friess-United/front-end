import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
});

const dummyItem = {
    name: 'Shoes',
    description: 'Running Shoes',
    price: '456',
    location: 'Congo',
    category: 'Clothing',
    URL: 'https://fake.url',
    user_id: 5
}

export default function ItemCard(props) {
    const [item, setItem] = useState(dummyItem);
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.item.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    Description: {props.item.description}                    
                </Typography>
                <Typography>
                    Price: ${props.item.price}
                </Typography>
                <Typography>
                    Country: {props.item.location}
                </Typography>
                    Category: {props.item.category}
            </CardContent>
        </Card>
    )
}