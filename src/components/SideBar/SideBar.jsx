import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material-ui imports
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemAvatar,
	ListItemText,
	Button,
	Collapse
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
	nested: {
		paddingLeft: theme.spacing(4)
	}
});

class SideBar extends Component {
	state = {
		settingsOpen: false
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

						<ListItem
							button
							onClick={() => this.props.history.push('/myLocations/0')}>
							<ListItemText
								primary={<Button className={classes.button}>Favorites</Button>}
							/>
						</ListItem>
						<Divider />
						<ListItem
							button
							onClick={() => this.props.history.push('/myLocations/1')}>
							<ListItemText
								primary={
									<Button className={classes.button}>My Locations</Button>
								}
							/>
						</ListItem>
						<Divider />
						<ListItem
							button
							onClick={() =>
								this.setState({ settingsOpen: !this.state.settingsOpen })
							}>
							<ListItemText
								primary={<Button className={classes.button}>Settings</Button>}
							/>
							{this.state.settingsOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={this.state.settingsOpen} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<AccountCircleTwoToneIcon />
									</ListItemIcon>
									<ListItemText primary='Change Default Location'/>
								</ListItem>
							</List>
						</Collapse>
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
export default withStyles(styles)(
	connect(mapStateToProps)(withRouter(SideBar))
);
