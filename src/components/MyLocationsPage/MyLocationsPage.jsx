import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import MyLocationsPageListItem from '../MyLocationsPageListItem/MyLocationsPageListItem';
import { withStyles, withTheme } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Tabs,
	Tab,
	List,
	Drawer
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		height: '100%'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		position: 'absolute'
	},
	header: {
		backgroundColor: theme.palette.primary.dark
	},

	title: {
		margin: 'auto'
	},
	lists: {
		height: '100vh',
		backgroundColor: theme.palette.background.paper
	}
});
class MyLocationsPage extends Component {
	state = {
		tabValue: this.props.listView
	};

	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_MARKER_TYPES' });
		this.props.dispatch({ type: 'FETCH_USER_FAVORITES' });
		this.props.dispatch({ type: 'FETCH_USER_CREATED' });
	}

	handleChange = (e, val) => {
		this.props.dispatch({ type: 'SET_VIEW', payload: val });
	};
	//function to get the list to be displayed on the mylocations page based on which tab is clicked
	getListHtml = (type, index) => {
		return (
			<List
				// dense
				index={index}
				hidden={this.props.listView !== index}
				role='tabpanel'>
				{this.props.user[type].map(marker => {
					return (
						<MyLocationsPageListItem
							key={marker.location_id}
							markerTypes={this.props.markerTypes}
							toggleDrawer={this.props.toggleDrawer}
							marker={marker}
							type={type}
						/>
					);
				})}
			</List>
		);
	};

	render() {
		const { classes } = this.props;
		return (
			<Drawer
				anchor='bottom'
				open={this.props.drawerOpen}
				onClose={this.props.toggleDrawer}
				className={classes.root}>
				<AppBar position='static' className={classes.header}>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
							onClick={this.props.toggleDrawer}>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Your Locations
						</Typography>
					</Toolbar>
				</AppBar>
				<AppBar position='static'>
					<Tabs
						value={this.props.listView}
						onChange={this.handleChange}
						variant='fullWidth'
						aria-label='simple tabs example'>
						<Tab label='Bookmarks' />
						<Tab label='Created' />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.props.listView}
					className={classes.lists}>
					<div dir={this.props.theme.direction}>
						{this.props.user.saved_locations && this.getListHtml('saved_locations', 0)}
					</div>
					<div dir={this.props.theme.direction}>
						{this.props.user.created_locations &&
							this.getListHtml('created_locations', 1)}
					</div>
				</SwipeableViews>
			</Drawer>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user,
	markerTypes: reduxStore.markers.markerTypes,
	listView: reduxStore.listView
});
export default connect(mapStateToProps)(
	withStyles(styles)(withTheme(MyLocationsPage))
);
