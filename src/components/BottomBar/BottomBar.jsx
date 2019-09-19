import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TypeMenu from '../TypeMenu/TypeMenu';
import FilterMenu from '../FilterMenu/FilterMenu';
import { withStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import MapIcon from '@material-ui/icons/Map';
import NearMeIcon from '@material-ui/icons/NearMe';

const styles = theme => ({
	root: {
		width: '100%',
		height: '10vh',
		backgroundColor: theme.palette.background.primary.main
	}
});

class BottomBar extends Component {
	state = {
		typeMenuAnchorEl: null,
		filterMenuAnchorEl: null
	};

	//sets anchor element for info window to the current marker's location
	handleOpen = event => {
		this.setState({ typeMenuAnchorEl: event.currentTarget });
	};
	handleFilterOpen = event => {
		this.setState({ filterMenuAnchorEl: event.currentTarget });
	};

	//removes anchor element for info window -- this removes it from view
	handleClose = () => {
		this.setState({ typeMenuAnchorEl: null });
	};
	handleFilterClose = () => {
		this.setState({ filterMenuAnchorEl: null });
	};

	//used for selecting an item type in the menu to add to the map
	handleSelect = event => {
		this.props.selectType(event.target.value);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<BottomNavigation showLabels className={classes.root}>
				<BottomNavigationAction
					label='Filters'
					onClick={this.handleFilterOpen}
					icon={<MapIcon />}
				/>
				<BottomNavigationAction
					// conditinoally render "cancel add" or "add site" based on if currently in add mode
					label={this.props.addMode ? 'Cancel Add' : 'Add Site'}
					icon={<AddLocationIcon />}
					onClick={
						this.props.addMode ? this.props.toggleAddMode : this.handleOpen
					}
				/>
				<BottomNavigationAction
							label='Find Closest...'
							icon={<NearMeIcon />}
					// onClick={() =>
					// 	//dispatch sets center of map back to user's default location.
					// 	this.props.user.use_device_location
					// 		? this.props.dispatch({
					// 				type: 'FETCH_CENTER',
					// 				payload: { id: this.props.user.id }
					// 		  })
					// 		: this.props.dispatch({
					// 				type: 'SET_CENTER',
					// 				payload: {
					// 					lat: Number(this.props.user.lat),
					// 					lng: Number(this.props.user.lng)
					// 				}
					// 		  })
					// }
				/>
				<TypeMenu
					//type menu for selecting what type of location someone is adding to the map
					id='typeMenu'
					anchorEl={this.state.typeMenuAnchorEl}
					open={Boolean(this.state.typeMenuAnchorEl)}
					handleClose={this.handleClose}
					handleSelect={this.handleSelect}
				/>
				<FilterMenu
					//filter menu for selecting what locations are showing on the map
					id='filterMenu'
					anchorEl={this.state.filterMenuAnchorEl}
					open={Boolean(this.state.filterMenuAnchorEl)}
					handleClose={this.handleFilterClose}
					handleSelect={this.handleSelect}
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
