import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuList, MenuItem } from '@material-ui/core';

class FilterMenu extends Component {
	render() {
		const optionList = [
			'Default',
			'Parking Racks',
			'Fixing Stations',
			'NiceRide Docking Stations'
		];
		const menuOptions = optionList.map((option, index) => {
			return (
				<MenuItem
					key={index}
					value={index}
					onClick={() => console.log('clicked: ', option)}>
					{option}
				</MenuItem>
			);
		});
		return (
			<Menu
				id='simple-menu'
				anchorEl={this.props.anchorEl}
				keepMounted
				open={this.props.open}
				onClose={this.props.handleClose}>
				{menuOptions}
				<MenuItem onClick={this.props.handleClose}>Cancel</MenuItem>
			</Menu>
		);
	}
}
const mapStateToProps = reduxStore => ({
	markerTypes: reduxStore.markers.markerTypes
});
export default connect(mapStateToProps)(FilterMenu);
