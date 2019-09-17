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
			//finds the result from google's api search that includes the nearest street address
			const foundResult = response.data.results.find(result =>
				result.types.includes('street_address')
			);
			//finds the street number, name, and locality
			const streetNumber = foundResult.address_components.find(add => add.types.includes('street_number'))
			const streetName = foundResult.address_components.find(add => add.types.includes('route'))
			const locality = foundResult.address_components.find(add => add.types.includes('locality'))
			const coords = foundResult.geometry.location
			//sends an object with address, locality, and coords
			//will update coords for pin so it drops at the closest street address
			res.send({ address: `${streetNumber.short_name} ${streetName.short_name}`, locality: locality.short_name, coords: coords });
		})
		.catch(error => {
			console.log('error on retrieving address from google geocode API', error);
			res.sendStatus(500);
		});
});

module.exports = router;
