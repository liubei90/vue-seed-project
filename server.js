var express = require('express');

var app = new express();

app.use(express.static('./build'));

app.listen(9000, () => {
  console.log('http://localhost:9000/');
})