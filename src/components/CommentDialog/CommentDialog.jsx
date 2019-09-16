import React, { Component } from 'react';
import { connect } from 'react-redux';
//material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CommentDialogue extends Component {
	state = {
		newComment: ''
	};

	handleSubmit = () => {
		this.props.dispatch({
			type: 'ADD_USER_COMMENT',
			payload: {locationId: this.props.selectedMarker.id, comment: this.state.newComment}
		});
		this.setState({ newComment: '' });
		this.props.handleClose();
	};

	handleCancel = () => {
		this.setState({ newComment: '' })
		this.props.handleClose()
	}

	render() {
		return (
			<Dialog open={this.props.dialogOpen} onClose={this.props.handleClose}>
				<DialogTitle id='form-dialog-title'>Leave a Comment?</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						variant='outlined'
						multiline
						rowsMax='3'
						id='commentBox'
						label='Add Your Comment Here'
						value={this.state.newComment}
						onChange={e => { this.setState({ newComment: e.target.value }); console.log(this.state) }}
						placeholder="text here"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleCancel} color='primary'>
						Cancel
					</Button>
					<Button onClick={this.handleSubmit} color='primary'>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
const mapStateToProps = reduxStore => ({
	selectedMarker: reduxStore.selectedMarker
})
export default connect(mapStateToProps)(CommentDialogue);
