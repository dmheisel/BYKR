const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

//get route to get account details such as lat, lng, default location, saved locations
//for one user out of database
router.get('/:id', (req, res) => {
	console.log('in accountDetails get for ', req.params.id);
	const id = req.params.id;
	const sqlText = `
	select user_settings.user_id, lat, lng, default_location, array_agg(users_locations_saved.location_id) as saved_locations
	from
		user_settings
	left join
		users_locations_saved
	on
		user_settings.user_id = users_locations_saved.user_id
	where
		user_settings.user_id = $1
	group by
		user_settings.id;`;

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
router.put('/:id', rejectUnauthenticated, (req, res) => {
	console.log(req.user);
	if (req.params.id == req.user.id) {
		const newLocation = req.body.newLocation;
		const newCoords = req.body.coords;
		const values = [newLocation, newCoords.lat, newCoords.lng, req.user.id];
		const sqlText = `UPDATE user_settings
					SET
						default_location = $1,
						lat = $2,
						lng = $3
					WHERE
						user_id = $4;`;
		pool
			.query(sqlText, values)
			.then(result => {
				console.log('Successful edit user account details');
				res.sendStatus(204);
			})
			.catch(error => {
				console.log('Error on edit user account details: ', error);
			});
	} else {
		res.sendStatus(403);
	}
});

//post route to add settings with new user to database
router.post('/', (req, res) => {
	console.log('in account details post: ', req.body);

	const values = [
		req.body.user_id,
		req.body.location,
		req.body.coords.lat,
		req.body.coords.lng
	];
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

router.post(`/save/:id`, rejectUnauthenticated, (req, res) => {
	const locationId = req.params.id
	const userId = req.user.id

	const sqlText = `
			INSERT
				INTO users_locations_saved
					(user_id, location_id)
				VALUES
					($1, $2);`

	pool.query(sqlText, [userId, locationId])
		.then(result => {
			console.log('location saved!')
			res.sendStatus(201)
		})
		.catch(error => {
			console.log('error on saving location: ', error)
		})
})

module.exports = router;
