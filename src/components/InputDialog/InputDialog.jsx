import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

class CommentDialogue extends Component {
	state = {
		inputText: ''
	};

	handleConfirm = () => {
		this.props.onConfirm(this.state.inputText);
		this.setState({ inputText: '' });
		this.props.handleClose();
	};

	handleCancel = () => {
		this.setState({ inputText: '' });
		this.props.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<Dialog open={this.props.dialogOpen} onClose={this.props.handleClose}>
				<DialogTitle id='form-dialog-title'>
					{this.props.dialogTitle}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						variant='outlined'
						multiline
						rowsMax='3'
						id='commentBox'
						label={this.props.dialogTextLabel}
						value={this.state.inputText}
						onChange={e => {
							this.setState({ inputText: e.target.value });
						}}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={
							this.props.notMandatory
								? () => {
										this.props.onConfirm('');
										this.handleCancel();
								  }
								: this.handleCancel
						}
						color='secondary'>
						{this.props.notMandatory ? 'No Thanks' : 'Cancel'}
					</Button>
					<Button onClick={this.handleConfirm} color='primary'>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
const mapStateToProps = reduxStore => ({
	selectedMarker: reduxStore.selectedMarker
});
export default connect(mapStateToProps)(withStyles(styles)(CommentDialogue));
