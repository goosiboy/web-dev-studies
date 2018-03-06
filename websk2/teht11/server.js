let express = require('express'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    expressHbs = require('express-handlebars');

let app = require('./app.js');

app.engine('.hbs', expressHbs(
    {
        defaultLayout: 'layout',
        extname: '.hbs'
    }
));

app.set('view engine', '.hbs');
app.set('views', './views');

// Express configurointi
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(bodyParser.json());

// Starttaa palvelin
app.listen(port);

console.log('RESTful API server started on: ' + port);
