import React, {useState} from 'react';
//import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
//import AppContext from '../contexts/AppContext';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

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
	//const {appState, dispatch} = useContext(AppContext);
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
					<Drawer open={Boolean(anchorEl)} onClose={handleClose}>
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								aria-controls="simple-menu"
								aria-haspopup="true"
								onClick={handleClose}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
						<List>
							<ListItem onClick={handleClose}>
								<Link to="/">Home</Link>
							</ListItem>
							<ListItem onClick={handleClose}>
								<Link to="/sign-up">Sign-Up</Link>
							</ListItem>
							<ListItem onClick={handleClose}>
								<Link to="/sign-in">Log In</Link>
							</ListItem>
							<ListItem onClick={handleClose}>
								<Link to="/user-home">Dashboard</Link>
							</ListItem>
							<ListItem onClick={handleClose}>
								<Link to="/user-home/my-items">My Items</Link>
							</ListItem>
						</List>
					</Drawer>
					<Button
						onClick={() => {
							window.location.href =
								'https://african-market-place-2.github.io/marketing/';
						}}
					>
						{' '}
						Africa Connected .{' '}
					</Button>
					{/* <Link to="/user-home/add-item">Add Item</Link> */}
					{/* <Link to="/user-home/item-list">Item List</Link> */}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
