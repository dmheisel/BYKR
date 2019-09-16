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

	handleOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleSelect = event => {
		this.props.selectType(event.target.value);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<BottomNavigation showLabels className={classes.root}>
					<BottomNavigationAction label='Filter Map' />
					<BottomNavigationAction
						label={this.props.addMode ? 'Cancel Add' : 'Add Site'}
						icon={<AddCircleOutline />}
						onClick={
							this.props.addMode ? this.props.toggleAddMode : this.handleOpen
						}
					/>
					<BottomNavigationAction
						label='Back to Default'
						onClick={() =>
							this.props.dispatch({
								type: 'SET_CENTER',
								payload: {
									lat: Number(this.props.user.lat),
									lng: Number(this.props.user.lng)
								}
							})
						}
					/>
				</BottomNavigation>
				<TypeMenu
					id='simple-menu'
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					handleClose={this.handleClose}
					handleSelect={this.handleSelect}
				/>
			</div>
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
