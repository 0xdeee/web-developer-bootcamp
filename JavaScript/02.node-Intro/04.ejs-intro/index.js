const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// by defaults it is pwd/views but if we run it from other dir it will cause issue
// setting it to current_dir/views will solve it.
// it doesnt have to be views, we can change that too
app.set('views', path.join(__dirname, '/views'));

app.listen(8080, () => {
  console.log('server created and listening to port 8080');
});

app.get('/', (req, res) => {
  // res.send('Hello world');
  res.render('home');
});

app.get('/rand', (req, res) => {
  let randomNumber = Math.floor(Math.random() * 10);

  res.render('random', { rand: randomNumber });
});

app.get('/top5crypto', (req, res) => {
  const top5 = ['BTC', 'ETH', 'ADA', 'MATIC', 'VET'];
  res.render('top5crypto', { top5 });
});
