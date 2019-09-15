
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const accountDetails = require('./routes/accountDetails.router')
const geocodeRouter = require('./routes/geocode.router')
const locationsRouter = require('./routes/locations.router')
const ratingRouter = require('./routes/rating.router')
const commentRouter = require('./routes/comment.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/account', accountDetails)
app.use('/api/geocode', geocodeRouter)
app.use('/api/locations', locationsRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/comment', commentRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
