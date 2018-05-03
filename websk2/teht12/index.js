//BACKEND..................

// Haetaan tarvittavat kirjastot express.js ja socket.io
let express = require('express');
let socket = require('socket.io');
let Game = require('./game');
const NUM = Game.randomInt();
let user = {};
let playerIDs = [];
let answers = [' is the winner!', 'Too small!', 'Too big!'];
let guessResponse;

// Alustetaan express ja asetetaan se app - variaabeliin.
let app = express();

// Luodaan server - variaabeli, joka sisältää express - serverin.
// Tämä variaabeli syötetään socket - funktioon, joka initialisoi socket.io:n.
let server = app.listen(4200, function() {
    console.log("Server started at 4200");
});

// Staattiset filut. Servataan expressin avulla public - kansiota.
app.use(express.static('public'));

// Socketin initialisointi ja configurointi
let io = socket(server);

// Kun yhteys on muodostettu, saadaan callbackina arvoja, joiden avulla voidaan tehdä kaikenlaisia
// websocket - hienouksia. Automaagista!
io.on('connection', function(socket) {
    console.log('socket.io connection made:', socket.id);

    socket.on('start', function() {
        user.id = socket.id;
        user.name = Game.randomName();
        playerIDs.push(socket.id);
        io.emit('start', user);
        user = {}; // Reset the user - object
    });

    socket.on('guess', function(data) {
        //console.log("players: ", players);

        for(let i = 0; i < playerIDs.length; i++) {
            if (playerIDs[i] === data.id) {
                let res = checkInt(data.message, NUM);
                console.log(data.message, '|' , NUM);
                switch(res) {
                    case 0:
                        console.log("RES: ", res, ' | ', answers[0]);
                        guessResponse = data.message + ' | ' + data.handle + answers[0];
                        io.emit('guess', {
                            message: guessResponse,
                            handle: data.handle
                        });
                    break;
                    case 1:
                        console.log("RES: ", res, ' | ', answers[1]);
                        guessResponse = data.message + ' | ' + answers[1];
                        io.emit('guess', {
                            message: guessResponse,
                            handle: data.handle
                        });
                    break;
                    case 2:
                        console.log("RES: ", res, ' | ', answers[2]);
                        guessResponse = data.message + ' | ' + answers[2];
                        io.emit('guess', {
                            message: guessResponse,
                            handle: data.handle
                        });
                    break;
                }
                break;
            }
        }

    });

});

function checkInt(userINT, storedINT) {

    if (userINT == storedINT) {
        return 0; // Victory
    } else if (userINT < storedINT) {
        return 1; // Smaller than
    } else {
        return 2; // Bigger than
    }

}
