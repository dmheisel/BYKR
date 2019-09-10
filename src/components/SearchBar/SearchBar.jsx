import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
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
		position: 'relative',
		pointerEvents: 'none',
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
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.search}>
				<div className={classes.icon}>
					<Menu />
				</div>
				<InputBase
					placeholder='Search…'
					classes={{
						root: classes.inputRoot,
						input: classes.inputInput
					}}
					inputProps={{ 'aria-label': 'search' }}
				/>
				<div className={classes.icon}>
					<SearchIcon />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
