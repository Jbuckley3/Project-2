/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express');
require('dotenv').config();
const path = require('path');
const { middleware } = require('./utils/middleware');  // Import middleware correctly
const UserRouter = require('./controllers/userControllers');
const taskControllers = require('./controllers/taskControllers.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Call middleware as a function
middleware(app);

/////////////////
//// Routes  ////
/////////////////

// basic home route
app.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session;
    res.render('home.ejs', { username, loggedIn, userId });
});

app.use('/users', UserRouter);

// Use taskControllers as a middleware
app.use(taskControllers);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Your server is running, better go catch it');
});
