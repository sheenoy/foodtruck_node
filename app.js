var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var logger      = require('morgan');
var app         = express();
var passport    = require('passport');
var flash       = require('connect-flash');
var fs          = require('fs');
var https       = require('https');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// config passport and connect to DB
require('./config/passport')(passport);
// set up express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// config passport
app.use(session({
    secret: 'amitkyadavisalwaysright',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set Https certificate
var options = {
    key: fs.readFileSync('privateKey.key'),
    cert: fs.readFileSync('certificate.crt')
};

var constantFile = require('./config/constant');
//API Routes
require('./app/login.js')(app, passport, constantFile.SERVER_SECRET, constantFile.API_URL)
require('./app/routes.js')(app, passport, constantFile.SERVER_SECRET, constantFile.API_URL); // load our routes and pass in our app and fully configured passport
// End Of API Routes

var apphelper    = require('./config/apphelper');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    return apphelper.returnResponce(res,err.status,{
        'status'    : false,
        'api_status': err.status,
        'data'      : constantFile.DATAPACKET,
        'message'   : "Invalid Urls"
    });
});

module.exports = app;
