const express = require('express');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const { errorConverter, errorHandler } = require('./src/middlewares/error');
const ApiError = require('./src/utils/ApiError');
const app = express();
const path = require('path');
const { initModules } = require( './src/routes' );
const { sequelize } = require( './src/config/sequelize' );
const { jwtStrategy } = require( './src/config/passport' );



// set security HTTP headers

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(express.static(path.join(__dirname, 'public')));

// v1 api routes
app.use('/api/v1', initModules(sequelize));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;
