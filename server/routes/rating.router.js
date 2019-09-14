const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

//get route to retrieve user's rating for the currently displayed location
router.get(`/:id`, rejectUnauthenticated, (req, res) => {
  const locationId = req.params.id
  const userId = req.user.id

  const sqlText = `
      select *
          from users_locations_ratings
        where
          user_id = $1 AND location_id = $2`
  pool
    .query(sqlText, [userId, locationId])
    .then(result => {
      console.log(result.rows)
      res.send(result.rows[0])
    })
    .catch(error => {
      console.log('error retrieving user rating from database: ', error)
      res.sendStatus(500)
    })
});

//POST route to add new rating into database table
router.post('/:id', rejectUnauthenticated, (req, res) => {
  let locationId = req.params.id
  let userId = req.user.id
  let rating = req.body.rating

  let sqlText = `
    insert into users_locations_ratings
      (user_id, location_id, rating)
    values
      ($1, $2, $3)`
  pool
    .query(sqlText, [userId, locationId, rating])
    .then(result => {
      console.log('successful POST user rating into db table')
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('error on POST user rating into db table: ', error)
      res.sendStatus(500)
    })

});

module.exports = router;
