const express = require('express');
const axios = require('axios');
const router = express.Router();

const api_key = process.env.REACT_APP_API_KEY;

//server router to get coords from google API
router.get('/coords/:location', (req, res) => {
	const location = req.params.location;
	//location is sent over as params on get request and used in request to geocode api
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${api_key}`;
	axios
		.get(url)
		.then(response => {
			console.log('success on retrieving geocode coordinates from google API');
			let coords = response.data.results[0].geometry.location;
			console.log('sending coords to saga: ', coords);
			res.send(coords);
		})
		.catch(error => {
			console.log(
				'error on retrieving geocode coordinates from google API: ',
				error
			);
			res.sendStatus(500);
		});
});

router.get('/address/:location', (req, res) => {
	const location = req.params.location;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${api_key}`;
	axios
		.get(url)
		.then(response => {
			console.log('successful retrieval of geocode address from google API');
			let address =
				response.data.results[0].address_components[0].short_name +
				' ' +
				response.data.results[0].address_components[1].short_name;
			console.log('address received: ', address);
			res.send(address);
		})
		.catch(error => {
			console.log('error on retrieving address from google geocode API', error);
			res.sendStatus(500);
		});
});


module.exports = router;
