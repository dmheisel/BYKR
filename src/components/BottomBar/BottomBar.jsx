import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TypeMenu from '../TypeMenu/TypeMenu';
import CheckBoxMenu from '../CheckBoxMenu/CheckBoxMenu';
import { withStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CancelIcon from '@material-ui/icons/Cancel';
import MapIcon from '@material-ui/icons/Map';
import NearMeIcon from '@material-ui/icons/NearMe';

const styles = theme => ({
	root: {
		width: '100%',
		height: '10vh',
		backgroundColor: theme.palette.background.paper
	},
	icon: {
		color: theme.palette.secondary.dark
	}
});

class BottomBar extends Component {
	state = {
		typeMenuAnchorEl: null,
		filterMenuAnchorEl: null,
		nearestMenuAnchorEl: null
	};

	//sets anchor element for info window to the current marker's location
	handleOpenFor = (event, name) => {
		this.setState({ [name]: event.currentTarget });
	};

	//removes anchor element for info window -- this removes it from view
	handleCloseFor = (event, name) => {
		this.setState({ [name]: null });
	};

	applyFilters = filters => {
		console.log('Sending filters to apply on following type ids: ', filters);
		this.props.dispatch({ type: 'FETCH_MARKERS', payload: filters });
		this.handleCloseFor(null, 'filterMenuAnchorEl');
	};

	findNearest = event => {
		//set payload to the marker type information based on value of menu item clicked on
		let payload = this.props.markerTypes.find(el => el.id === event.target.value)
		//adds lat and lng to payload for query to server to find closest
		payload.user = this.props.user
		payload.coords = `${this.props.user.lat},${this.props.user.lng}`
		this.props.dispatch({ type: 'FIND_NEAREST_MARKER', payload: payload });
		this.handleCloseFor(null, 'nearestMenuAnchorEl');
	};
	//used for selecting an item type in the menu to add to the map
	handleSelect = event => {
		this.props.selectType(event.target.value);
		this.handleCloseFor(event, 'typeMenuAnchorEl');
	};

	render() {
		const { classes } = this.props;
		return (
			<BottomNavigation showLabels className={classes.root}>
				<BottomNavigationAction
					label='Filters'
					onClick={event => this.handleOpenFor(event, 'filterMenuAnchorEl')}
					icon={<MapIcon className={classes.icon} />}
				/>
				<BottomNavigationAction
					// conditinoally render "cancel add" or "add site" based on if currently in add mode
					label={this.props.addMode ? 'Cancel Add' : 'Add Site'}
					icon={
						this.props.addMode ? (
							<CancelIcon className={classes.icon} />
						) : (
							<AddLocationIcon className={classes.icon} />
						)
					}
					onClick={
						this.props.addMode
							? this.props.toggleAddMode
							: event => this.handleOpenFor(event, 'typeMenuAnchorEl')
					}
				/>
				<BottomNavigationAction
					label='Find Closest...'
					icon={<NearMeIcon className={classes.icon} />}
					onClick={event => this.handleOpenFor(event, 'nearestMenuAnchorEl')}
				/>
				<TypeMenu
					//type menu for selecting what type of location someone is adding to the map
					id='typeMenu'
					anchorEl={this.state.typeMenuAnchorEl}
					open={Boolean(this.state.typeMenuAnchorEl)}
					handleClose={event => this.handleCloseFor(event, 'typeMenuAnchorEl')}
					handleSelect={this.handleSelect}
				/>
				<CheckBoxMenu
					//filter menu for selecting what locations are showing on the map
					id='filterMenu'
					anchorEl={this.state.filterMenuAnchorEl}
					open={Boolean(this.state.filterMenuAnchorEl)}
					handleApply={this.applyFilters}
					handleClose={event =>
						this.handleCloseFor(event, 'filterMenuAnchorEl')
					}
					preSelected={[1, 2]}
				/>
				<TypeMenu
					id='nearestMenu'
					anchorEl={this.state.nearestMenuAnchorEl}
					open={Boolean(this.state.nearestMenuAnchorEl)}
					thirdPartyAllowed={true}
					handleSelect={this.findNearest}
					handleClose={event =>
						this.handleCloseFor(event, 'nearestMenuAnchorEl')
					}
				/>
			</BottomNavigation>
		);
	}
}
const mapStateToProps = reduxStore => ({
	markerTypes: reduxStore.markers.markerTypes,
	user: reduxStore.user
});
export default connect(mapStateToProps)(
	withStyles(styles)(withRouter(BottomBar))
);
