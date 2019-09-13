import React, { Component } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton'
import { connect } from 'react-redux';

//material-ui imports
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { withStyles } from '@material-ui/core/styles';

//styling for page
const styles = theme => ({
	root: {
		width: '70vw'
	},
	menuHeader: {
		height: '20vh'
	},
	list: {
		// width: 'auto'
	}
});

class SideBar extends Component {
	render() {
		const { classes } = this.props;

		return (
      <Drawer open={this.props.drawerOpen} onClose={this.props.toggleDrawer}>
				<div className={classes.root}>
					<List className={classes.menuHeader}>
						<ListItem >
							<ListItemAvatar>
								<AccountCircleTwoToneIcon />
							</ListItemAvatar>
							<ListItemText>{this.props.user.username}</ListItemText>
						</ListItem>
						<ListItem>
							<LogOutButton />
						</ListItem>
          </List>
          <List>
						<Divider />
						<ListItem>
							<ListItemText>Test Text 1</ListItemText>
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText>Test Text 2</ListItemText>
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText>Test Text 3</ListItemText>
						</ListItem>
						<Divider />
					</List>
				</div>
			</Drawer>
		);
	}
}
const mapStateToProps = reduxState => ({
	user: reduxState.user
})
export default withStyles(styles)(connect(mapStateToProps)(SideBar));
