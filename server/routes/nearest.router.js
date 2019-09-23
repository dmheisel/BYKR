const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');

//route to get closest location from user's location
//expects two queries - filter for location type and user's current location as lat,lng
router.get('/', rejectUnauthenticated, (req, res) => {
  const filter = req.query.filter;
  const currentLoc = req.query.currentLoc.split(',');
  const sqlText = `
  select * , ( point(lat, lng) <-> point($1, $2) ) AS distance
    from locations
      where location_type_id = $3
    order by distance
    limit 1;`;

  pool
    .query(sqlText, [currentLoc[0], currentLoc[1], filter])
    .then(result => {
      console.log('successful GET of closest requested locaton type is ', result.rows[0])
      res.send(result.rows[0])
    })
    .catch(error => {
      console.log('error on getting closest requested location type: ', error)
      res.sendStatus(500)
    })
});

module.exports = router;
