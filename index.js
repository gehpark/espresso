var express = require('express');
var app = express();
var jade = require('jade');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.locals.basedir = app.get('views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/about', function(request, response) {
  response.render('pages/about')
});

app.get('/contact', function(request, response) {
  response.render('pages/contact')
});

app.get('/arts', function(request, response) {
  response.render('pages/arts')
});

app.get('/artwork', function(request, response) {
  response.render('pages/artwork')
});

app.get('/photography', function(request, response) {
  response.render('pages/photography')
});

app.get('/programming', function(request, response) {
  response.render('pages/programming')
});

app.get('/travel', function(request, response) {
  response.render('pages/travel')
});

app.get('/drinks', function(request, response) {
  response.render('pages/drinks')
});

app.get('/espresso', function(request, response) {
  response.render('pages/slotMachine')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


