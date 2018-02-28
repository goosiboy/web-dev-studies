let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    expressHbs = require('express-handlebars');

let search = require('./routes/searchStudent'),
    update = require('./routes/updateStudent');

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

// Routet
app.use('/search', search);
app.use('/update', update);

// Starttaa palvelin
app.listen(port);

console.log('RESTful API server started on: ' + port);
