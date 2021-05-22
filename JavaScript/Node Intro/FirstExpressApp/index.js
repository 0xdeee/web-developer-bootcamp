const express = require('express');
const app = express();

app.listen(5000, () => {
  console.log(
    'Application.listen() method returned a Node Server that is listening to port 5000'
  );
});

app.use(() => {
  console.log("we've got a new request");
});
