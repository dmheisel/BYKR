import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Menu,
	MenuItem,
	Checkbox,
	ListItemText,
	ListItemIcon
} from '@material-ui/core';

class FilterMenu extends Component {
	state = {
		selected: []
	};

  componentDidMount() {
    this.setState({selected: this.props.preSelected})
  }


	//adds item to list of selected to apply to map or removes it if already is applied
	toggleChecked = id => {
		if (this.state.selected.includes(id)) {
			this.setState({ selected: this.state.selected.filter(x => x !== id) });
		} else {
			this.setState({ selected: [...this.state.selected, id] });
		}
	};

	render() {
		const menuOptions = this.props.markerTypes.map(type => (
			<MenuItem key={type.id} value={type.id} disableRipple>
				<ListItemIcon onClick={() => this.toggleChecked(type.id)}>
					<Checkbox
						checked={this.state.selected.includes(type.id)}
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
        <MenuItem onClick={() => { this.props.handleApply(this.state.selected)}}>Apply</MenuItem>
				<MenuItem onClick={this.props.handleClose}>Cancel</MenuItem>
			</Menu>
		);
	}
}
const mapStateToProps = reduxStore => ({
	markerTypes: reduxStore.markers.markerTypes
});
export default connect(mapStateToProps)(FilterMenu);
