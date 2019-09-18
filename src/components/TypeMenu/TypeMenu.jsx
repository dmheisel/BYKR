import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';



class TypeMenu extends Component {
  render() {
    const menuOptions = this.props.markerTypes.map(type => (
			<MenuItem key={type.id} value={type.id} onClick={this.props.handleSelect}>
				{type.type_name}
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
export default connect(mapStateToProps)(TypeMenu);
