import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

//material-ui imports
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Button,
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
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`
	},
	button: {
		margin: theme.spacing(0)
	},
	list: {
		// width: 'auto'
	}
});

class SideBar extends Component {
	state = {
		tabValue: 0
	};
	render() {
		const { classes } = this.props;

		return (
			<Drawer open={this.props.drawerOpen} onClose={this.props.toggleDrawer}>
				<div className={classes.root}>
					<List className={classes.menuHeader}>
						<ListItem>
							<ListItemAvatar>
								<AccountCircleTwoToneIcon />
							</ListItemAvatar>
							<ListItemText>{this.props.user.username}</ListItemText>
						</ListItem>
						<ListItem>
							<Button
								size='small'
								className={classes.button}
								onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
								Log Out
							</Button>
						</ListItem>
					</List>
					<List>
						<Divider />

						<ListItem>
							<ListItemText>
								<Button className={classes.button} onClick={() => this.props.history.push('/myLocations/0')}>Favorites</Button>
							</ListItemText>
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText>
								<Button className={classes.button} onClick={() => this.props.history.push('/myLocations/1')}>My Locations</Button>
							</ListItemText>
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText>
								<Button className={classes.button}>Settings</Button>
							</ListItemText>
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
});
export default withStyles(styles)(connect(mapStateToProps)(withRouter(SideBar)));
