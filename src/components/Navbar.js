import React, {useReducer, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppContext from '../contexts/AppContext';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

function Navbar() {
	const classes = useStyles();
	const {appState, dispatch} = useContext(AppContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>
							<Link to="/">Home</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link to="/sign-up">Sign-Up</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link to="/sign-in">Log In</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link to="/user-home">Dashboard</Link>
						</MenuItem>
					</Menu>
					<Button
						onClick={() => {
							window.location.href =
								'https://african-market-place-2.github.io/marketing/';
						}}
					>
						{' '}
						Africa Connected .{' '}
					</Button>
					<Link to="/user-home/add-item">Add Item</Link>
					<Link to="/user-home/item-list">Item List</Link>
					<Link to="/user-home/my-items">My Items</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
