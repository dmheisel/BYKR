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
	Button,
	Grid,
	Avatar,
	Typography
} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { withStyles } from '@material-ui/core/styles';
import SettingsList from '../SettingsList/SettingsList';

//styling for page
const styles = theme => ({
	root: {
		width: '70vw',
		height: '100%',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.contrastText
	},
	menuHeader: {
		height: '20vh',
		backgroundColor: theme.palette.secondary.light
	},
	nameTag: {
		margin: theme.spacing(1),
		padding: theme.spacing(1)
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
					<Grid
						container
						direction='column'
						justify='space-between'
						className={classes.menuHeader}>
						<Grid className={classes.nameTag} container direction='row'>
							<Grid item xs={3}>
								<Avatar>
									<AccountCircleTwoToneIcon />
								</Avatar>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='h4'>{this.props.user.username}</Typography>
							</Grid>
						</Grid>
						<Grid container justify='flex-end'>
							<Grid item xs={3}>
								<Button
									size='small'
									className={classes.button}
									onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
									Log Out
								</Button>
							</Grid>
						</Grid>
					</Grid>
					{/* <List className={classes.menuHeader}>
						<ListItem>
							<ListItemAvatar>
								<AccountCircleTwoToneIcon />
							</ListItemAvatar>
							<ListItemText
								primary={this.props.user.username}
								primaryTypographyProps={{variant: 'h4', align: 'right'}}
							/>
						</ListItem>
						<ListItem>
							<Button
								size='small'
								className={classes.button}
								onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
								Log Out
							</Button>
						</ListItem>
					</List> */}
					<List>
						<SettingsList
							toggleDrawer={this.props.toggleDrawer}
							drawerOpen={this.props.drawerOpen}
						/>
						<Divider />

						<ListItem
							button
							onClick={e => {
								this.props.dispatch({ type: 'SET_VIEW', payload: 0 });
								this.props.toggleDrawer();
								this.props.toggleLocationsDrawer(e, 'topDrawer');
							}}>
							<ListItemText
								primary={
									<Button className={classes.button}>Your Bookmarks</Button>
								}
							/>
						</ListItem>
						<Divider />
						<ListItem
							button
							onClick={e => {
								this.props.dispatch({ type: 'SET_VIEW', payload: 1 });
								this.props.toggleDrawer();
								this.props.toggleLocationsDrawer(e, 'topDrawer');
							}}>
							<ListItemText
								primary={
									<Button className={classes.button}>Your Created</Button>
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
