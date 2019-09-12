import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import {
	BottomNavigation,
	BottomNavigationAction,
	Menu,
	MenuItem
} from '@material-ui/core';
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
		const menuOptions = this.props.locationTypes.map(type => (
			<MenuItem key={type.id} value={type.id} onClick={this.handleSelect}>{type.type_name}</MenuItem>
		))
		return (
			<div>
				<BottomNavigation showLabels className={classes.root}>
					<BottomNavigationAction
						label={this.props.addMode ? 'Cancel Add' : 'Add Site'}
						icon={<AddCircleOutline />}
						onClick={this.props.addMode ? this.props.toggleAddMode : this.handleOpen}
					/>
				</BottomNavigation>
				<Menu
					id='simple-menu'
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleClose}>
					{menuOptions}
					<MenuItem onClick={this.handleClose}>Cancel</MenuItem>
				</Menu>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	locationTypes: reduxStore.locations.locationTypes
})
export default connect(mapStateToProps)(withStyles(styles)(BottomBar));
