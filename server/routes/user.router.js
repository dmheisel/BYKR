const express = require('express');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');
const api_key = process.env.REACT_APP_API_KEY;


const router = express.Router();
// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  let sqlText = 'SELECT "lat", "lng" FROM "user_settings" WHERE "user_id" = $1'
  pool.query(sqlText, [req.user.id])
    .then(response => {
      let user = { ...req.user, lat: response.rows[0].lat, lng: response.rows[0].lng };
      res.send(user)
    })
    .catch(error => {
      console.log('error on retrieving info from settings db: ', error)
    })
	// Send back user object from the session (previously queried from the database)
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res) => {
	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password);
	const queryText =
		'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
	pool
		.query(queryText, [username, password])
		.then(response => {
			const city = req.body.city;
			let id = response.rows[0].id;
			let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${api_key}`;
			axios
				.get(url)
				.then(response => {
					console.log('successful fetch geocode location');
					let { lat, lng } = response.data.results[0].geometry.location;
					let sqlText = `INSERT INTO "user_settings" (user_id, lat, lng) VALUES ($1, $2, $3)`;
					pool
						.query(sqlText, [id, lat, lng])
						.then(reponse => {
							console.log('successful add to settings database');
						})
						.catch(error =>
							console.log('error in adding to settings database: ', error)
						);
				})
				.catch(error => {
					console.log('error in getting geocode location: ', error);
				});
			res.sendStatus(201);
		})
		.catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
	res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
	// Use passport's built-in method to log out the user
	req.logout();
	res.sendStatus(200);
});

module.exports = router;
