
'use strict';

let fs = require('fs');
let path = require('path');
//takes us to current directory and joins the pets.json file.
let petsPath = path.join(__dirname, 'pets.json');

let http = require('http'); //used to include modules that exist in separate files.
let port = process.env.PORT || 8000;  //represents the state of the system environment your application is when it starts. 

let server = http.createServer(function(req, res) {  //createServer turns computer into an HTTP server.
  if (req.method === 'GET' && (req.url === '/pets/' || req.url === '/pets')) {  //allows user to type in /pets/ or /pets.
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500; 
        res.setHeader('Content-Type', 'GET localhost:8000/petstext/plain');
        return res.end('Internal Server Error'); //ends response process. 
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', function(err, petsData) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500; //if an error, return error 500
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error'); //ends response process. 
      }

      let pets = JSON.parse(petsData);
      let petsJSON = JSON.stringify(pets[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  
  else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', function(err, petsData) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      let pets = JSON.parse(petsData);
      let petsJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  else {
    res.statusCode = 404; //if nothing ^ is working, return code 404.
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});

<<<<<<< HEAD
module.exports = server;
=======
module.exports = server;
>>>>>>> 06d13104523a4bf8efeedb4d89821012eaad9d2e
