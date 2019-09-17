import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import {
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	Collapse
} from '@material-ui/core';
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import InputDialog from '../InputDialog/InputDialog';

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

class SettingsList extends Component {
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
			<div>
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
				<InputDialog
					dialogOpen={this.state.dialogOpen}
					dialogTitle='Change your Default Location?'
					dialogTextLabel='Input New Default Location'
					handleClose={this.handleDialogClose}
					handleOpen={this.handleDialogOpen}
					onConfirm={inputText => {
						this.setState({ settingsOpen: !this.state.settingsOpen });
						this.props.toggleDrawer();
						this.props.dispatch({
							type: 'UPDATE_USER_DEFAULT_LOCATION',
							payload: { id: this.props.user.id, newLocation: inputText }
						});
					}}
				/>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(withStyles(styles)(SettingsList));
