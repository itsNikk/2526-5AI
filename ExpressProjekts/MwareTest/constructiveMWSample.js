const express = require('express');
const app = express();

app.use(function(req, res, next) {
  const lingua = req.headers['accept-language'];

  if (lingua === 'it') {
    req.saluto = 'Benvenuto';
  } else {
    req.saluto = 'Welcome';
  }

  next();
});

// Il route handler trova req.saluto già pronto
app.get('/benvenuto', function(req, res) {
  res.json({ messaggio: req.saluto });
});

app.listen(3000);