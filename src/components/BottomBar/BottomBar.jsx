import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '10vh'
	}
});

export default function BottomBar() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}>
			<BottomNavigationAction label='Add Site' icon={<AddCircleOutline />} />
		</BottomNavigation>
	);
}
