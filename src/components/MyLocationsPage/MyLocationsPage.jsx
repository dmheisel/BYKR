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
	List
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
		position: 'absolute'
	},
	header: {
		backgroundColor: theme.palette.primary.dark,
	},

	title: {
		margin: 'auto'
	},
	lists: {
		height: '85vh',
		backgroundColor: theme.palette.background.paper
	}
});
class MyLocationsPage extends Component {
	state = {
		tabValue: Number(this.props.match.params.listIndex)
	};

	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_MARKER_TYPES' });
		this.props.dispatch({ type: 'FETCH_USER_FAVORITES' });
		this.props.dispatch({ type: 'FETCH_USER_CREATED' });
	}

	handleChange = (e, val) => {
		this.setState({ tabValue: val });
	};
	//function to get the list to be displayed on the mylocations page based on which tab is clicked
	getListHtml = (type, index) => {
		return (
			<List
				// dense
				index={index}
				hidden={this.state.tabValue !== index}
				role='tabpanel'>
				{this.props.myLocations[type].map(marker => {
					return (
						<MyLocationsPageListItem
							key={marker.location_id}
							markerTypes={this.props.markerTypes}
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
			<div className={classes.root}>
				<AppBar position='static' className={classes.header}>
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
				<SwipeableViews
					axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.tabValue}
					className={classes.lists}>
					<div dir={this.props.theme.direction}>
						{this.getListHtml('mySaved', 0)}
					</div>
					<div dir={this.props.theme.direction}>
						{this.getListHtml('myCreated', 1)}
					</div>
				</SwipeableViews>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	myLocations: reduxStore.myLocations,
	markerTypes: reduxStore.markers.markerTypes
});
export default connect(mapStateToProps)(
	withStyles(styles)(withTheme(MyLocationsPage))
);
