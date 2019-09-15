import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
  Typography,
  Tabs,
  Tab,
	Button
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
    marginRight: theme.spacing(2),
    position: 'absolute'
	},
	title: {
    margin: 'auto'
	}
});
class MyLocationsPage extends Component {
  state = {
    tabValue: 0
  }

  handleChange = (e, val) => {
    this.setState({tabValue: val})
  }

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
							onClick={() => this.props.history.push('/home')}>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Your Locations
						</Typography>
					</Toolbar>
				</AppBar>
				<AppBar position="static">
					<Tabs
						value={this.state.tabValue}
            onChange={this.handleChange}
            variant="fullWidth"
						aria-label='simple tabs example'>
						<Tab label='Saved Locations'  />
						<Tab label='Created Locations'  />
						{/* <Tab label='Item Three' /> */}
					</Tabs>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MyLocationsPage);
