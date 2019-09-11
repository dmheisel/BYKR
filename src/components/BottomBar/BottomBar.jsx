import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const styles = theme =>({
	root: {
		width: '100%',
		height: '10vh'
	}
});

class BottomBar extends Component {

	render() {
		const { classes } = this.props
		return (
			<BottomNavigation
				showLabels
				className={classes.root}>
				<BottomNavigationAction label={this.props.addMode ? 'Cancel Add': 'Add Site'} icon={<AddCircleOutline />} onClick={this.props.toggleAddMode} />
			</BottomNavigation>
		);
	}
}

export default withStyles(styles)(BottomBar);
