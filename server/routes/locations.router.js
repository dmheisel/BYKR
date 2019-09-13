const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

// get route to get all locations from database locations table
router.get('/', (req, res) => {
	const sqlText = `
	SELECT locations.id, lat, lng, created_by_user_id, location_types.type_name
		FROM locations
		JOIN location_types
			ON locations.location_type_id = location_types.id;`;

	pool
		.query(sqlText)
		.then(result => {
			console.log(`successful GET from locations db table`);
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error on GET route from locations db table: ', error);
			res.sendStatus(500);
		});
});

//get route to get all location types available and save to redux state
router.get('/types', (req, res) => {
	const sqlText = `SELECT * FROM location_types;`;
	pool
		.query(sqlText)
		.then(result => {
			console.log('successful GET of location types');
			res.send(result.rows);
		})
		.catch(error => {
			console.log(`error on GET of location types: ${error}`);
			res.sendStatus(500);
		});
});

//get route to get comments for specific location and save to state.
router.get('/comments/:id', (req, res) => {
	const id = req.params.id;
	const sqlText = `
	select
    locations.id,
    lat,
    lng,
    location_type_id,
    array_agg(users_locations_comments.comment) as user_comments,
    array_agg(users_locations_comments.user_id) as user_ids
  FROM
    locations
  left join
    users_locations_comments
  ON
    locations.id = users_locations_comments.location_id
  WHERE
    locations.id = $1
  group BY
    locations.id;`;

	pool
		.query(sqlText, [id])
		.then(result => {
			console.log('successful GET of location comments');
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error on GET request of location comments', error);
			res.sendStatus(500);
		});
});

//get route to get average ratings for specific location and save to state.
router.get('/rating/:id', (req, res) => {
	const id = req.params.id;
	const sqlText = `
	select
    locations.id,
    round(avg(rating), 1) as avg_rating
	from
		locations
	left join
		users_locations_ratings
	on
		locations.id = users_locations_ratings.location_id
	where
		locations.id = $1
	group by
		locations.id;`;

	pool
		.query(sqlText, [id])
		.then(result => {
			console.log('successful GET of location rating');
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log('error on GET request of location rating', error);
			res.sendStatus(500);
		});
});

// post route to add location into database locations table
router.post('/', rejectUnauthenticated, (req, res) => {
	const coords = req.body.coords;
	const type = req.body.type;
	const sqlText = `INSERT
        INTO locations
          (lat, lng, location_type_id, created_by_user_id)
        VALUES
          ($1, $2, $3, $4);`;
	const values = [coords.lat, coords.lng, type, req.user.id];
	pool
		.query(sqlText, values)
		.then(result => {
			console.log('location succesfully added to db table locations');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on adding to db table locations: ', error);
			res.sendStatus(500);
		});
});

//delete route to remove location from database locations table
router.delete('/:id', rejectUnauthenticated, (req, res) => {
	//get created_by_id from database to double check before deleting
	//users can only delete locations they created
	const sqlText = `SELECT created_by_user_id FROM locations WHERE id = $1;`;
	pool.query(sqlText, [req.params.id]).then(result => {
		//checks if id is in database
		if (result.rows.length > 0) {
			//checks if user is same as user who created location
			if (result.rows[0].created_by_user_id === req.user.id) {
				const sqlText = `DELETE FROM locations WHERE id = $1;`;
				pool
					.query(sqlText, [req.user.id])
					.then(result => {
						console.log('successful delete from location database table');
						res.sendStatus(204);
					})
					.catch(error => {
						console.log('error deleting from location database table: ', error);
						res.sendStatus(500);
					});
			} else {
				console.log('user does not match');
				res.sendStatus(403);
			}
		} else {
			console.log('location not found in database table');
			res.sendStatus(404);
		}
	});
});

module.exports = router;
