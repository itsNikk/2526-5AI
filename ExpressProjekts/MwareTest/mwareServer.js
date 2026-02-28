const express = require('express');
const app = express();

app.use(function(req, res, next) {
  console.log('[LOG] ' + req.method + ' ' + req.url);
  next();
});

app.use('/admin', function(req, res, next) {
  console.log('[ADMIN] Accesso area riservata');
  next();
});

app.get('/oggetti', function(req, res) {
  res.json({ messaggio: 'Lista oggetti' });
});

app.get('/admin/pannello', function(req, res) {
  res.json({ messaggio: 'Pannello di controllo' });
});

app.listen(3000);