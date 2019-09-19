import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Menu,
	MenuItem,
	Checkbox,
	ListItemText,
	ListItemIcon,
	Radio
} from '@material-ui/core';

class FilterMenu extends Component {
	state = {
		selected: this.props.preSelected
	};

	// componentDidMount() {
	// 	this.setState({ selected: this.props.preSelected });
	// }

	//adds item to list of selected to apply to map or removes it if already is applied
	toggleChecked = id => {
		if (this.state.selected.includes(id)) {
			this.setState({ selected: this.state.selected.filter(x => x !== id) });
		} else {
			this.setState({ selected: [...this.state.selected, id] });
		}
	};

	toggleRadio = id => {
		this.setState({ selected: id });
	};

	render() {
		const menuOptions = this.props.markerTypes.map(type => (
			<MenuItem key={type.id} value={type.id} disableRipple>
				<ListItemIcon
					onClick={
						this.props.radio
							? () => this.toggleRadio(type.id)
							: () => this.toggleChecked(type.id)
					}>
					{this.props.radio ? (
						<Radio
							checked={this.state.selected === type.id}
							value={type.id}
							edge='start'
						/>
					) : (
						<Checkbox
							checked={this.state.selected.includes(type.id)}
							edge='start'
						/>
					)}
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
				<MenuItem
					onClick={() => {
						this.props.handleApply(
							this.props.markerTypes.filter(item =>
								this.props.radio
									? [this.state.selected].includes(item.id)
									: this.state.selected.includes(item.id)
							)
						);
					}}>
					Apply
				</MenuItem>
				<MenuItem onClick={this.props.handleClose}>Cancel</MenuItem>
			</Menu>
		);
	}
}
const mapStateToProps = reduxStore => ({
	markerTypes: reduxStore.markers.markerTypes
});
export default connect(mapStateToProps)(FilterMenu);
