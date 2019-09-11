import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';

const styles = theme => ({
	search: {
		position: 'absolute',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: 'white',
		marginRight: '10%',
		marginLeft: '10%',
		marginTop: '30px',
		zIndex: '1',
		width: '80%',
		display: 'flex',
		justifyContent: 'space-between'
	},
	icon: {
		width: theme.spacing(7),
		height: '100%',
		zIndex: '2',
		position: 'relative',
		display: 'inline-flex',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: 'inherit'
	},
	inputInput: {
		width: '100%'
	}
});

class SearchBar extends Component {
	state = {
		newLocation: ''
	};

	searchLocation = () => {
		this.props.dispatch({ type: 'UPDATE_CENTER', payload: this.state.newLocation });
		this.setState({newLocation: ''})
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.search}>
				<div className={classes.icon}>
					<IconButton>
						<Menu />
					</IconButton>
				</div>
					<InputBase
						placeholder='Search…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						value={this.state.newLocation}
						inputProps={{ 'aria-label': 'search' }}
						onChange={event => {
							this.setState({ newLocation: event.target.value });
						}}
					/>
				<div className={classes.icon}>
					<IconButton onClick={this.searchLocation}>
						<SearchIcon />
					</IconButton>
				</div>
			</div>
		);
	}
}
const mapStateToProps = reduxStore => ({
	user: reduxStore.user
});
export default connect(mapStateToProps)(withStyles(styles)(SearchBar));
