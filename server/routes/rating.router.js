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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;
