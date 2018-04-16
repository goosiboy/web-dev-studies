let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    routes = require('./api/routes/routes'),
    cors = require('cors');

let bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

// Allow cross-origin resource sharing
app.use(cors());

app.listen(port);

routes(app);

console.log('todo list RESTful API server started on: ' + port);