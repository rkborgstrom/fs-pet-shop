'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

// let morgan = require('morgan');
let bodyParser = require('body-parser');

app.disable('x-powered-by');
// app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, petsData) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let pets = JSON.parse(petsData);
        res.set('Content-Type', 'application/json');
        res.send(pets);
    });
});

app.post('/pets', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (readErr, petsData) {
        if (readErr) {
            console.error(readErr.stack);
            return res.sendStatus(500);
        }
        // console.log(petsData);
        let pets = JSON.parse(petsData);
        // console.log(pets);
        let age = req.body.age;
        let kind = req.body.kind;
        let name = req.body.name;

        let newPet = {
            name,
            age,
            kind
        };

        if (!name || !kind || !age) {
            return res.sendStatus(400);
        }

        // console.log(pets);
        pets.push(newPet);
        let newPetsJSON = JSON.stringify(pets);

        // console.log(newPetsJSON);

        fs.writeFile(petsPath, newPetsJSON, function (writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'application/json');
            res.send(newPet);
        });
    });
});

app.get('/pets/:id', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, newPetsJSON) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(newPetsJSON);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.set('Content-Type', 'application/json/');
        res.send(pets[id]);
    });
});

app.use(function (req, res) {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});



module.exports = app;

