const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const User = require('./models/user');

mongoose
  .connect('mongodb://localhost:27017/auth-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to DB'))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'qwerty',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   httpOnly: true,
    //   expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    // },
  })
);

// middleware to check if the session belongs to session cookie passed has value for loggedInUser
// if yes - user is logged in, so proceed|| if no - redirect user to login page.
const checkLogin = (req, res, next) => {
  if (!req.session.loggedInUser) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  const newUser = new User(req.body);
  // added mongoose pre middleware to hash password before storing it.
  await newUser.save();
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // defined login auth function in mongoose schema
  const user = await User.authenticateLogin(username, password);
  // if authentication function returns a user, login success
  // if authentication funciton returns false, username or password is wrong
  if (user) {
    req.session.loggedInUser = user._id;
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
});

// using checkLogin middleware to check if user if loggedIn or not
app.get('/secret', checkLogin, async (req, res) => {
  res.render('secret');
});

app.get('/topsecret', checkLogin, async (req, res) => {
  res.render('topsecret');
});

app.post('/logout', async (req, res) => {
  // to logout the user, remove the loggedInUser flag in user session data in server
  if (req.session.loggedInUser) {
    req.session.loggedInUser = null;
  }
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('server is running!');
});
