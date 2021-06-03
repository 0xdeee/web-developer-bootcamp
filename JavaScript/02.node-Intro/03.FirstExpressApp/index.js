const express = require('express');
const app = express();

app.listen(5000, () => {
  console.log(
    'Application.listen() method returned a Node Server that is listening to port 5000'
  );
});

// app.use((req, res) => {
//   console.log("we've got a new request");
// });

app.get('/btc', (req, res) => {
  res.send('Bitcoin');
});

// URI Param
app.get('/crypto/:pair', (req, res) => {
  console.log(req.params);
  const { pair } = req.params;
  res.send(`${pair.slice(0, 3)} To ${pair.slice(3)}`);
});

app.get('/crypto/:pair/exchange/:ex', (req, res) => {
  console.log(req.params);
  const { pair, ex } = req.params;
  res.send(`${pair.slice(0, 3)} To ${pair.slice(3)} in ${ex}`);
});

// query string
app.get('/crypto', (req, res) => {
  console.log(req.query);
  const { q } = req.query;
  res.send(`Request for search key ${q} received`);
});
