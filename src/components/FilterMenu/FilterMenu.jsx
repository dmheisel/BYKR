import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Menu,
	MenuItem,
	List,
	ListItem,
	Checkbox,
	ListItemText,
	ListItemIcon,
	ListItemAction
} from '@material-ui/core';

class FilterMenu extends Component {
	state = {
		filters: []
	};

	applyFilters = () => {
		console.log(
			'Sending filters to apply on following type ids: ',
			this.state.filters
		);
		this.props.dispatch({type: 'FETCH_MARKERS', payload: this.state.filters})
	};

	//adds item to list of filters to apply to map or removes it if already is applied
	toggleFilter = id => {
		if (this.state.filters.includes(id)) {
			this.setState({ filters: this.state.filters.filter(x => x !== id) });
		} else {
			this.setState({ filters: [...this.state.filters, id] });
		}
	};

	render() {
		const menuOptions = this.props.markerTypes.map(type => (
			<MenuItem key={type.id} value={type.id} disableRipple>
				<ListItemIcon onClick={() => this.toggleFilter(type.id)}>
					<Checkbox
						checked={this.state.filters.includes(type.id)}
						edge='start'
					/>
				</ListItemIcon>
				<ListItemText primary={type.type_name + 's'} />
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
				<MenuItem onClick={this.applyFilters}>Apply</MenuItem>
				<MenuItem onClick={this.props.handleClose}>Cancel</MenuItem>
			</Menu>
		);
	}
}
const mapStateToProps = reduxStore => ({
	markerTypes: reduxStore.markers.markerTypes
});
export default connect(mapStateToProps)(FilterMenu);
