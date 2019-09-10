const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

//get route to get the lat, lng from a user's settings
router.get('/:id', (req, res) => {
	console.log('in settings get for ', req.params.id);
	const id = req.params.id;
	const sqlText = `
			SELECT lat, lng, default_location
				FROM user_settings
				WHERE user_id = $1;`;
	pool
		.query(sqlText, [id])
		.then(result => {
			console.log('successful retrieval of user lat and lng');
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error on retrieval of user lat and lng: ', error);
			res.sendStatus(500);
		});
});

//put route to change user's default location stored in settings
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const newLocation = req.body.location;
	const newCoords = req.body.coords
	const values = [newLocation, newCoords.lat, newCoords.lng, id]
	const sqlText =
				`UPDATE user_settings
					SET
						default_location = $1,
						lat = $2,
						lng = $3,
					WHERE
						user_id = $4;`
	pool
		.query(sqlText, values)
		.then(result => {
			console.log('Successful edit user settings');
			res.sendStatus(204)
		})
		.catch(error => {
			console.log('Error on edit user settings: ', error)
		})
})

//post route to add settings with new user to database
router.post('/', (req, res) => {
	console.log('in settings post: ', req.body);

	const values = [req.body.user_id, req.body.location, req.body.coords.lat, req.body.coords.lng];
	const sqlText = `
					INSERT
						INTO user_settings
							(user_id, default_location, lat, lng)
						VALUES
							($1, $2, $3, $4)`;
	pool
		.query(sqlText, values)
		.then(result => {
			console.log('added user and location to user_settings table');
			res.sendStatus(204);
		})
		.catch(error => {
			console.log(
				'error on adding user/location to user_settings table: ',
				error
			);
		});
});

module.exports = router;
