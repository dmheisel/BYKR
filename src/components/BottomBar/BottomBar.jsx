import React, { Component } from 'react';
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
					<MenuItem value={1} onClick={this.handleSelect}>
						Bike Rack
					</MenuItem>
					<MenuItem value={2} onClick={this.handleSelect}>
						Fix Station
					</MenuItem>
					<MenuItem onClick={this.handleClose}>Cancel</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(BottomBar);
