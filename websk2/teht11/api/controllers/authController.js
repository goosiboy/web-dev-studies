let User = require('../models/User');

let jwt = require('jsonwebtoken');
let config = require('../../config');

module.exports = {
    register: function(req, res) {
        User.create({ name: req.body.name, password: req.body.password }, 
            function(err, user) {
                if(err) return res.send("Error! Couldnt finish the registering of the user.");

                // Luodaan token. Tokenin ID, sekä käyttäjän ID laitetaan samaksi. 
                // Näin voimme myöhemmin verrata niitä, ja siten todentaa käyttäjän.
                // Config.secret - arvoa käytetään tokenin todenperäisyyden tarkistamiseen.
                let token = jwt.sign({id: user._id}, config.secret, {
                    expiresIn: 10000 // expires in ~3 hours
                });

                // Palvelin vastaa: Autentikaatio onnistui. Tässä allekirjoitettu token määritetyillä arvoilla.
                res.send({ auth: true, token: token });
            }
        );
    },
    // Login - järjestelmän alustus
    auth: function(req, res) {

        // Otetaan vastaan headersissa oleva tietty arvo. Jos arvo on tyhjä -> error.
        let token = req.headers['x-access-token'];
        if(!token) return res.send({ auth: false, message: 'No token provided.' });

        // Verifioidaan vastaanotettu token ja verrataan sitä config.secret - arvoon. Jos autentikaatio
        // onnistuu, saadaan decodattu arvo, jonka ID:tä verrataan tietokannan käyttäjien tunnuksiin. 
        // Näin saamme selvitettyä käyttäjän, sekä pyynnön oikeellisuuden. 
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });

            // { password: 0 } -> Estetään salasanan lähetys osana responsea.
            // Haetaan kannasta oikea käyttäjä vertaamalla tunnuksia. Käyttäjän tiedot palautetaan 
            // responsena.
            User.findById(decoded.id, { password: 0 }, function (err, user) { 
                if(err) return res.send("There was a problem!");
                if(!user) return res.send("User not found!");
                res.send(user);
            });
        });

    },
    // Simppelimpi callbackkeihin perustuva JWT - tarkistus metodi.
    // Ottaa vastaan tokenin parametrina ja tarkistaa sen. Palauttaa callbackina 
    // tuloksen.
    auth0: function(accessToken, callback) {

        let token = accessToken;
        if(token == null) {
            callback('No token provided.');
            return;
        }

        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) { 
                callback(err);
                return;
            } else {
                callback(true);
                return;
            };
        });

    }
}