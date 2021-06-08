const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
// middleware fn to add support to parse different ttype of data in to req body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () =>
  console.log('server started at 8080 and listenting to incoming requests')
);

app.get('/', (req, res) => {
  const name = 'Home';
  res.render('home', { name });
});

app.post('/buy', (req, res) => {
  console.dir(req.body);
  res.send('success');
});
