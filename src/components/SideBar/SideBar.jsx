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
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import InputDiaolog from '../InputDialog/InputDiaolog';

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
		margin: theme.spacing(0),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(0)
	}
});

class SideBar extends Component {
	state = {
		settingsOpen: false,
		dialogOpen: false
	};

	handleDialogClose = () => {
		this.setState({ dialogOpen: false });
	};
	handleDialogOpen = () => {
		this.setState({ dialogOpen: true });
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
								<ListItem
									button
									className={classes.nested}
									onClick={this.handleDialogOpen}>
									<ListItemIcon>
										<EditLocationOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary='Change Default Location' />
								</ListItem>
							</List>
						</Collapse>
						<Divider />
					</List>
					<InputDiaolog
						dialogOpen={this.state.dialogOpen}
						dialogTitle='Change your Default Location?'
						dialogTextLabel='Input New Default Location'
						handleClose={this.handleDialogClose}
						handleOpen={this.handleDialogOpen}
						onConfirm={inputText =>
							this.props.dispatch({
								type: 'UPDATE_USER_DEFAULT_LOCATION',
								payload: { id: this.props.user.id, newLocation: inputText }
							})
						}
					/>
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
