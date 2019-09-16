import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Tabs,
	Tab,
	List,
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
		position: 'absolute'
	},
	title: {
		margin: 'auto'
	}
});
class MyLocationsPage extends Component {
	state = {
		tabValue: 0
	};

	handleChange = (e, val) => {
		this.setState({ tabValue: val });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
							onClick={() => this.props.history.push('/home')}>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Your Locations
						</Typography>
					</Toolbar>
				</AppBar>
				<AppBar position='static'>
					<Tabs
						value={this.state.tabValue}
						onChange={this.handleChange}
						variant='fullWidth'
						aria-label='simple tabs example'>
						<Tab label='Saved Locations' />
						<Tab label='Created Locations' />
					</Tabs>
				</AppBar>
				<List
					dense
					className={classes.root}
					index={0}
					hidden={this.state.tabValue !== 0}
					role='tabpanel'>
					<ListItem>
						<ListItemAvatar>
							<LocalParkingIcon />
						</ListItemAvatar>
						<ListItemText
							primary='Type of Location'
							secondary='Location Address'
						/>
						<ListItemIcon edge='end'>
							<Rating value={3} readOnly size='small' />
						</ListItemIcon>
					</ListItem>
				</List>
			</div>
		);
	}
}

export default withStyles(styles)(MyLocationsPage);
