import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material-ui imports
import {
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Button
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { withStyles } from '@material-ui/core/styles';
import SettingsList from '../SettingsList/SettingsList';

//styling for page
const styles = theme => ({
	root: {
		width: '70vw',
		height: '100%',
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	menuHeader: {
		height: '20vh',
		backgroundColor: theme.palette.secondary.main
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`
	},
	button: {
		margin: theme.spacing(0),
		color: theme.palette.primary.contrastText
	}
});

class SideBar extends Component {
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
						<SettingsList
							toggleDrawer={this.props.toggleDrawer}
							drawerOpen={this.props.drawerOpen}
						/>
						<Divider />

						<ListItem
							button
							onClick={() => this.props.history.push('/myLocations/0')}>
							<ListItemText
								primary={<Button className={classes.button}>See Bookmarked</Button>}
							/>
						</ListItem>
						<Divider />
						<ListItem
							button
							onClick={() => this.props.history.push('/myLocations/1')}>
							<ListItemText
								primary={
									<Button className={classes.button}>See Created</Button>
								}
							/>
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
export default withStyles(styles)(
	connect(mapStateToProps)(withRouter(SideBar))
);
