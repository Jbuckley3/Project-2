//////////////////////////////////
//// Import Dependencies      ////
//////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const methodOverride = require('method-override');

//////////////////////////////////
//// Middleware Function      ////
//////////////////////////////////

const middleware = (app) => {
    app.use(methodOverride('_method'));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('tiny'));
    app.use(express.static('public'));
    app.use(express.json());

    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL,
            }),
            saveUninitialized: true,
            resave: false,
        })
    );

    // Attach user information to res.locals for use in views
    app.use((req, res, next) => {
        res.locals.loggedIn = req.session.loggedIn;
        res.locals.username = req.session.username;
        res.locals.userId = req.session.userId;
        next();
    });

    // Ensure the ensureLoggedIn middleware is applied after session middleware
    app.use(ensureLoggedIn);
};

// Export ensureLoggedIn
const ensureLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    res.redirect('/users/login');
};

module.exports = { middleware, ensureLoggedIn };
