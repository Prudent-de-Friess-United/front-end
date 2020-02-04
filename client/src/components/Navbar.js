import React from 'react';
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography>Sauti Africa</Typography>
                    <Link to="/">Home</Link>
                    <Link to="/sign-up">Sign-Up</Link>
                    <Link to="/sign-in">Log In</Link>
                    <Link to="/user-home">Dashboard</Link>
                </Toolbar>
                
            </AppBar>
        </div>
    )
}

export default Navbar;