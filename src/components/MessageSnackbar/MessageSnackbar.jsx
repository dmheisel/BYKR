import React, { Component } from 'react';
import { Snackbar,  IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';


class MessageSnackbar extends Component {
  render() {
    return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				open={this.props.open}
				autoHideDuration={5000}
				onClose={this.props.onClose}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				message={<span id='message-id'>{this.props.message}</span>}
				action={[
					<IconButton
						key='close'
						aria-label='close'
						color='inherit'
						onClick={this.props.onClose}>
						<CloseIcon />
					</IconButton>
				]}
			/>
		);
  }
}

export default MessageSnackbar;
