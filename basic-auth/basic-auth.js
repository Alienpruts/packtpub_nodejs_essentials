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
var JSONWebToken = require('jsonwebtoken');
var Crypto = require('crypto');

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

// Generate JSONWebtoken for use in further requests.
var generateToken = function(request, response) {
    // Payload contains user id + username. Verify if claim is correct.
    var payload = {
        id: user.id,
        username: user.username,
    };

    // Generate random string
    var secret = Crypto.randomBytes(128).toString('base64');

    // Create token using payload + secret (hashing?)
    var token = JSONWebToken.sign(payload, secret);

    // Set secret in user object (normally, would be DB)
    request.user = user;
    request.user.secret = secret;

    return token;
};

var generateTokenHandler = function(request, response) {
    var user = request.user;

    // Generate token.
    var token = generateToken(user);

    console.log(token);
    // Return the user a token to use.
    response.send(token);
};

// Use the Localstrategy in our 'master' Passport object
Passport.use('local', localStrategy);

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use(Passport.initialize());

app.post(
    '/login',
    Passport.authenticate('local', {session: false}),
    generateTokenHandler
);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
