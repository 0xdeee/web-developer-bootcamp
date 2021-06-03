const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.listen(8080, () =>
  console.log('server started at 8080 and listenting to incoming requests')
);

app.get('/', (req, res) => {
  const name = 'Home';
  res.render('home', { name });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  let pageData = redditData[subreddit];
  if (pageData) {
    res.render('subreddit', { ...pageData });
  } else {
    const name = '404 Error';
    res.render('not-found', { name });
  }
});
