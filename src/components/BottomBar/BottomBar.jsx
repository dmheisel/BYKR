import React, { Component } from 'react';
import { connect } from 'react-redux'
import TypeMenu from '../TypeMenu/TypeMenu'
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
				<TypeMenu
					id='simple-menu'
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					handleClose={this.handleClose}
					handleSelect={this.handleSelect}/>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	locationTypes: reduxStore.locations.locationTypes
})
export default connect(mapStateToProps)(withStyles(styles)(BottomBar));
