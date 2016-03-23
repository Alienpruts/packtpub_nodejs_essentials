/**
 * Created by bert on 3/23/16.
 */

var users = {
    foo: {
        username: 'foo',
        password: 'bar',
        id: 1,
    },

    bar: {
        username: 'bar',
        password: 'foo',
        id: 2,
    },
};


var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Express = require('express');
var BodyParser = require('body-parser');

var options = {
    usernameField: 'username',
    passwordField: 'password',
};

var app = Express();

// Set up our passport handler, define verify callback to check for credentials.
var localStrategy = new LocalStrategy(options, function (username, password, done) {
    user = users[username];

    if (user == null) {
        return done(null, false, { message: 'Invalid user'});
    }

    if (user.password !== password) {
        return done(null, false, {message: 'Invalid password'});
    }

    done(null, user);
});

// Use the Localstrategy in our 'master' Passport object
Passport.use('local', localStrategy);

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use(Passport.initialize());
