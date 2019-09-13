import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';



class TypeMenu extends Component {
  render() {
    const menuOptions = this.props.locationTypes.map(type => (
			<MenuItem key={type.id} value={type.id} onClick={this.props.handleSelect}>
				{type.type_name}
			</MenuItem>
		));
    return (
			<Menu
				id='simple-menu'
				anchorEl={this.props.anchorEl}
				keepMounted
				open={Boolean(this.props.anchorEl)}
				onClose={this.props.handleClose}>
				{menuOptions}
				<MenuItem onClick={this.props.handleClose}>Cancel</MenuItem>
			</Menu>
		);
  }
}
const mapStateToProps = reduxStore => ({
	locationTypes: reduxStore.locations.locationTypes
});
export default connect(mapStateToProps)(TypeMenu);
