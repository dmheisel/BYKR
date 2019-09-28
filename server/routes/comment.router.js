const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

//route to fetch all comments for current location
router.get(`/:id`, (req, res) => {
	//needs a location id to come in as a parameter
	//user does not need to be loggedin to see comments left for a location
	const locationId = req.params.id;
	const sqlText = `
    select users_locations_comments.id, username, location_id, comment
	    from users_locations_comments
	  join
		  "user"
	  on
		  "user".id = users_locations_comments.user_id
  	where
		  location_id = $1
    order by users_locations_comments.id desc;`;

	pool
		.query(sqlText, [locationId])
		.then(result => {
			console.log('successful retrieval of location comments from db table');
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error on retrieval of location comments from db table: ', error);
			res.sendStatus(500);
		});
});

//route to POST new comment into database table
router.post('/:id', rejectUnauthenticated, (req, res) => {
	//needs location id as param on route, needs object {comment: 'text'} for data
	//needs user to be logged in to be able to add comment.
	console.log(req.user, req.params, req.body);
	const locationId = req.params.id;
	const userId = req.user.id;
	const comment = req.body.comment;

	const sqlText = `
    INSERT
      INTO users_locations_comments
        (user_id, location_id, comment)
      VALUES
        ($1, $2, $3)`;
	pool
		.query(sqlText, [userId, locationId, comment])
		.then(result => {
			console.log('successful insert of comment into database table');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('error on inserting comment into database table: ', error);
			res.sendStatus(500);
		});
});


module.exports = router;
