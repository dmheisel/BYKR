import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuList, MenuItem } from '@material-ui/core';

class FilterMenu extends Component {
	render() {
		const menuOptions = this.props.markerTypes.map(type => (
			<MenuItem
				key={type.id}
				value={type.id}
				onClick={() => console.log('clicked: ', type.type_name)}>
				{type.type_name + 's'}
			</MenuItem>
		));

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
