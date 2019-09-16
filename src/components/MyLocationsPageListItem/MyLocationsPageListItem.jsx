import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import {
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText,
	ListItemSecondaryAction
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import BuildIcon from '@material-ui/icons/Build';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

class MyLocationsPageList extends Component {
	render() {
		return (
			<div>
				<ListItem>
					<ListItemAvatar edge='start'>
						{Number(this.props.marker.location_type_id) === 1 ? (
							<LocalParkingIcon />
						) : (
							<BuildIcon />
						)}
					</ListItemAvatar>
					<ListItemText
						primary={
							this.props.markerTypes[this.props.marker.location_type_id - 1]
								.type_name
						}
						secondary={this.props.marker.address}
						onClick={() => console.log('List Item Clicked on')}
					/>
					<ListItemIcon>
						<RoomOutlinedIcon />
					</ListItemIcon>
					{this.props.type === 'myCreated' && (
						<ListItemIcon>
							<DeleteSweepOutlinedIcon />
						</ListItemIcon>
					)}
					<ListItemIcon>
						<Rating
							value={Number(this.props.marker.avg_rating)}
							readOnly
							size='small'
							edge='end'
						/>
					</ListItemIcon>
				</ListItem>
			</div>
		);
	}
}

export default connect()(MyLocationsPageList);
