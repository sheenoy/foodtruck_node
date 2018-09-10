// load all the things needed
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
// load up the user model
var usersModel = require('../models/Users');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // handles login
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // usersModel
            usersModel.authanticateDbUser(username, function(err, rows){
                if (err)
                    return done(err.sqlMessage);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!bcrypt.compareSync(password, rows[0].password)){
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
    
    // // handles signup
    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         usernameField : 'username',
    //         passwordField : 'password',
    //         passReqToCallback : true
    //     },
    //     function(req, username, password, done) {
    //         connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
    //             if (err)
    //                 return done(err);
    //             if (rows.length) {
    //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //             } else {

    //                 // if there is no user with that username then create the user

    //                 var newUserMysql = {
    //                     username: username,
    //                     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))  // use the generateHash function in our user model
    //                 };

    //                 var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

    //                 connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
    //                     newUserMysql.id = rows.insertId;

    //                     return done(null, newUserMysql);
    //                 });
    //             }
    //         });
    //     })
    // );
};