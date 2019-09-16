const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

//get route to get all of a user's saved locations
router.get(`/saved`, rejectUnauthenticated, (req, res) => {
	let userId = req.user.id;
	let sqlText = `
		select sav.user_id, loc.id as location_id, lat, lng, loc.address, loc.location_type_id, round(avg(rating),1) as avg_rating
	from
		locations as loc
	left join
		users_locations_ratings as rat
	on
		loc.id = rat.location_id
	left join
		users_locations_saved as sav
	on
		loc.id = sav.location_id
	where
		sav.user_id = $1
	group by
		sav.user_id, loc.id;`;

	pool
		.query(sqlText, [userId])
		.then(result => {
			console.log('successful GET user saved locations');
			res.send(result.rows);
		})
		.catch(error => {
			console.log('error on GET user saved locations');
			res.sendStatus(500);
		});
});

router.get('/created', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const sqlText = `
    select loc.created_by_user_id, loc.id as location_id, lat, lng, loc.address, loc.location_type_id, round(avg(rating), 1) as avg_rating
      from
        locations as loc
      left join
        users_locations_ratings as rat
      on
        loc.id = rat.location_id
      where
        loc.created_by_user_id = $1
      group by
        loc.id;`
  pool
    .query(sqlText, [userId])
    .then(result => {
      console.log('successful get of created locations from db table')
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error on get of created locations from db table: ', error)
      res.sendStatus(500)
    })
})

module.exports = router
