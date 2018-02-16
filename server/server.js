const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const passport = require('./strategies/user.strategy');
const sessionConfig = require('./modules/session-middleware');

//DB Module
const db = require('./modules/db.config.js');

// Route includes
const userRouter = require('./routes/user.router');
const gameRouter = require('./routes/game.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/easy-mode', gameRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 7845;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
