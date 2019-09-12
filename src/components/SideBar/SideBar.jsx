import React, { Component } from 'react';
//material-ui imports
import {
	Avatar,
	Drawer,
	Button,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { withStyles } from '@material-ui/core/styles';

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
							<ListItemText>UserName</ListItemText>
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

export default withStyles(styles)(SideBar);
