import React, { Component } from 'react';
//material-ui imports
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	button: {
		margin: theme.spacing(1)
	},
	deleteButton: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
		color: theme.status.danger
	}
});

class ConfirmationDialog extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.open}>
				<DialogTitle>Delete Marker?</DialogTitle>
				<DialogContent>
					<Typography variant='body2'>
						Are you sure you want to delete this marker? This cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant='contained'
						className={classes.button}
						color="secondary"
						onClick={this.props.toggleConfirmationDialog}>
						Cancel
					</Button>
					<Button
						variant='contained'
						// color='primary'
						className={classes.deletebutton}
						onClick={() => {
							this.props.toggleConfirmationDialog();
							this.props.handleDeleteClick();
						}}>
						Delete
						<DeleteIcon className={classes.rightIcon} />
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withStyles(styles)(ConfirmationDialog);
