import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Background from '../Views/Bike-Rack.png';

const styles = theme => ({
	root: {
		backgroundImage: `url(${Background})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'top',
		height: '100vh',
		width: '100vw',
		display: 'flex'
	},
	formContainer: {
		width: '70%',
		height: '300px',
		marginTop: '80%',
		backgroundColor: 'white'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	}
});

class LoginPage extends Component {
	state = {
		username: '',
		password: ''
	};

	login = event => {
		event.preventDefault();

		if (this.state.username && this.state.password) {
			this.props.dispatch({
				type: 'LOGIN',
				payload: {
					username: this.state.username,
					password: this.state.password
				}
			});
		} else {
			this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
		}
	}; // end login

	handleInputChangeFor = propertyName => event => {
		this.setState({
			[propertyName]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<Container className={classes.root}>
				<Container className={classes.formContainer}>
					<form onSubmit={this.login}>
						<h1>BYKR Login</h1>
						<TextField
							className={classes.textField}
							label='Username'
							variant='filled'
							value={this.state.username}
							onChange={this.handleInputChangeFor('username')}
						/>
						<TextField
							className={classes.textField}
							type='password'
							label='Password'
							variant='filled'
							value={this.state.password}
							onChange={this.handleInputChangeFor('password')}
						/>
						<Button type='submit'>Log In</Button>
						<Button
							type='button'
							className='link-button'
							onClick={() => {
								this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' });
							}}>
							Register
						</Button>
						{this.props.errors.loginMessage && (
							<h5 className='alert' role='alert'>
								{this.props.errors.loginMessage}
							</h5>
						)}
					</form>
				</Container>
			</Container>
		);
	}
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
