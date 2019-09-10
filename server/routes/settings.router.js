const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();


router.get('/:id', (req, res) => {
	console.log('in settings get for ', req.params.id);
	const id = req.params.id;
	const sqlText = `
			SELECT lat, lng
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

router.post('/', (req, res) => {
	console.log('in settings post: ', req.body);

	const values = [req.body.user_id, req.body.coords.lat, req.body.coords.lng];
	const sqlText = `
					INSERT
						INTO user_settings
							(user_id, lat, lng)
						VALUES
							($1, $2, $3)`;
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
