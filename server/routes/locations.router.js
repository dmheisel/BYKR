const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();


// get route to get all locations from database locations table
router.get('/', (req, res) => {
  const sqlText = `SELECT * FROM locations`
  pool.query(sqlText)
    .then(result => {
      console.log(`successful GET from locations db table`)
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error on GET route from locations db table: ', error)
      res.sendStatus(500)
    })
});


// post route to add location into database locations table
router.post('/', rejectUnauthenticated, (req, res) => {
  const coords = req.body.coords
  const type = req.body.type;
  const sqlText =
    `INSERT
        INTO locations
          (lat, lng, location_type_id, created_by_user_id)
        VALUES
          ($1, $2, $3, $4);`
  const values = [coords.lat, coords.lng, type, req.user.id];
  pool
    .query(sqlText, values)
    .then(result => {
      console.log('location succesfully added to db table locations')
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('error on adding to db table locations: ', error);
      res.sendStatus(500)
    })
});

module.exports = router;
