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
    auth: function(req, res) {        
        const name = req.body.username;
        const password = req.body.password;
    
        // Check if user exists
        User.getUserByName(name, (err, user) => {
            if(err) throw err;

            if(!user) {
                return res.json({success: false, msg: 'User not found'});
            }

            console.log(user);
    
            // We compare the passwords. If we get a match, a token will be assigned
            User.comparePasswords(password, user.password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({data: user}, config.secret, {
                        expiresIn: 604800 // 1 week 
                    });
                    
                    res.json({
                        success: true,
                        token: token,
                        user: {
                            id: user._id,
                            name: user.name,
                            password: user.password
                        }
                    });
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
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