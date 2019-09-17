import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TypeMenu from '../TypeMenu/TypeMenu';
import { withStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
	root: {
		width: '100%',
		height: '10vh'
	}
});

class BottomBar extends Component {
	state = {
		anchorEl: null
	};

	//sets anchor element for info window to the current marker's location
	handleOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	//removes anchor element for info window -- this removes it from view
	handleClose = () => {
		this.setState({ anchorEl: null });
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
					<BottomNavigationAction label='Filter Map' />
					<BottomNavigationAction
						// conditinoally render "cancel add" or "add site" based on if currently in add mode
						label={this.props.addMode ? 'Cancel Add' : 'Add Site'}
						icon={<AddCircleOutline />}
						onClick={
							this.props.addMode ? this.props.toggleAddMode : this.handleOpen
						}
					/>
					<BottomNavigationAction
						label='Back to Default'
						onClick={() =>
							//dispatch sets center of map back to user's defaults.
							this.props.dispatch({
								type: 'SET_CENTER',
								payload: {
									lat: Number(this.props.user.lat),
									lng: Number(this.props.user.lng)
								}
							})
						}
					/>
					<TypeMenu
						//type menu for selecting what type of location someone is adding to the map
						id='typeMenu'
						anchorEl={this.state.anchorEl}
						open={Boolean(this.state.anchorEl)}
						handleClose={this.handleClose}
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
