const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get(`/avgRating/:id`, (req, res) => {
	const locationId = req.params.id;
	const sqlText = `
		select round(avg(rating), 1) as avg_rating
			from users_locations_ratings
		where
			location_id = $1`;
	pool
		.query(sqlText, [locationId])
		.then(result => {
			console.log('average rating gathered from database table');
			console.log(result.rows)
			res.send({rating: result.rows[0].avg_rating || 0});
		})
		.catch(error => {
			console.log(
				'error on gathering average rating from database table: ',
				error
			);
		});
});
//get route to retrieve user's rating for the currently displayed location
router.get(`/userRating/:id`, rejectUnauthenticated, (req, res) => {
	const locationId = req.params.id;
	const userId = req.user.id;

	const sqlText = `
      select rating
          from users_locations_ratings
        where
          user_id = $1 AND location_id = $2`;
	pool
		.query(sqlText, [userId, locationId])
		.then(result => {
			console.log(result.rows);
			res.send(result.rows[0] || null);
		})
		.catch(error => {
			console.log('error retrieving user rating from database: ', error);
			res.sendStatus(500);
		});
});

//POST route to add new rating into database table
router.post('/:id', rejectUnauthenticated, (req, res) => {
	const locationId = req.params.id;
	const userId = req.user.id;
	const rating = req.body.rating;

	const sqlText = `
    insert into users_locations_ratings
      (user_id, location_id, rating)
    values
      ($1, $2, $3)`;
	pool
		.query(sqlText, [userId, locationId, rating])
		.then(result => {
			console.log('successful POST user rating into db table');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on POST user rating into db table: ', error);
			res.sendStatus(500);
		});
});

router.put(`/:id`, rejectUnauthenticated, (req, res) => {
	const locationId = req.params.id;
	const userId = req.user.id;
	const rating = req.body.rating;

	const sqlText = `
    update users_locations_ratings
      set
        rating = $1
      where
        user_id = $2 AND location_id = $3`;

	pool
		.query(sqlText, [rating, userId, locationId])
		.then(result => {
			console.log('successful update with new user rating into db table');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on updating new user rating into db table:', error);
			res.sendStatus(500);
		});
});

module.exports = router;
