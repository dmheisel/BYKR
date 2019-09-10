const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
	console.log('in settings get for ', req.params.id);
	const id = req.params.id;
	const sqlText = `
			SELECT lat, lng
				FROM user_settings
				WHERE user_id = $1;`
	pool
		.query(sqlText, [id])
		.then(result => {
			console.log('successful retrieval of user lat and lng')
			res.send(result.rows[0])
		})
		.catch(error => {
			console.log('error on retrieval of user lat and lng: ', error);
			res.sendStatus(500)
		})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
	console.log('in settings post: ', req.body);
	const user_id = req.body.user_id;
	const location = req.body.location;
	//url to use in api request to google maps to fetch city coords
	const api_key = process.env.REACT_APP_API_KEY;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`;
	axios
		.get(url)
		.then(response => {
			console.log('successful fetch geocode location');
			// console.log(response.data.results[0].geometry.location)
			let { lat, lng } = response.data.results[0].geometry.location;
			console.log('lat and lng found: ', lat, lng);
			let sqlText = `INSERT INTO "user_settings" (user_id, lat, lng) VALUES ($1, $2, $3)`;
			pool
				.query(sqlText, [user_id, lat, lng])
				.then(result => {
					console.log('successful add to settings database');
					res.sendStatus(201);
				})
				.catch(error => {
					console.log('error in adding to settings database: ', error);
					res.sendStatus(500);
				});
		})
		.catch(error => {
			console.log('error in getting geocode location: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
