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
var BearerStrategy = require('passport-http-bearer').Strategy;

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

var verifyToken = function (token, done) {
    var payload = JSONWebToken.decode(token);
    var user = users[payload.username];

    // If user does not exists, or false credentials are give : false.
    if (user == null ||
        user.id !== payload.id ||
        user.username !== payload.username) {
        return done(null, false);
    }

    // Ensure the token is valid now we have a user.
    JSONWebToken.verify(token, user.secret, function (error, decoded) {
        if (error || decoded == null) {
            return done(error, false);
        }

        // We have a user and token is verified, user has been cleared.
        return done(null, user);
    })
};

var bearerStrategy = new BearerStrategy(
    verifyToken
);

// Use the Localstrategy in our 'master' Passport object
Passport.use('local', localStrategy);
// Use the BearerStrategy.
Passport.use('bearer', bearerStrategy);

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use(Passport.initialize());

app.post(
    '/login',
    Passport.authenticate('local', {session: false}),
    generateTokenHandler
);

// Create a alternative route to test bearer strategy login with.
app.get(
    '/userinfo',
    Passport.authenticate('bearer', {session: false}),
    function (request, response) {
        var user = request.user;
        response.send({
            id: user.id,
            username: user.username,
        });
    }
);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
