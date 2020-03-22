var config = require('./config');
var express = require('express');
var app = express();
app.set('secret', config.secret);
app.use(express.static('build'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
//ssl & https 
var http = require('http');
var server = http.createServer(/*credentials,*/ app);
// MongoDB
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://192.168.157.131/todo', { useUnifiedTopology: true, useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Animal = require('./models/Animal');
app.post("/create", cors(), function (req, res) {
    console.log('/create');
    var _a = req.body, category = _a.category, mass = _a.mass, size = _a.size, name = _a.name;
    var elephant = new Animal({
        category: category,
        mass: mass,
        size: size,
        name: name
    });
    // console.log(elephant.category); //  Direct access  the type of elephant instance.  output => "on land"
    // elephant.getCategory(); //access elephant.category by method.  output => "This animal is belongs to on land"
    // store document
    elephant.save(function (err, elephant) {
        if (err) {
            return console.error(err);
        }
        console.log('document saved');
        //db.close(); // this close the connection with db. if close you need to reconnect it
    });
    res.send("Save OK!");
});
app.post("/read", cors(), function (req, res) {
    Animal.findOne({
        category: req.body.category
    }, function (err, docs) {
        console.log('docs', docs);
        if (docs && (docs.category === req.body.category)) {
            res.send(docs);
            console.log(docs.category);
        }
        else {
            //console.log(docs.category);
            res.send('cant find');
        }
    });
});
app.post("/update", cors(), function (req, res) {
    var _a = req.body, category = _a.category, mass = _a.mass, size = _a.size, name = _a.name;
    Animal.update({
        category: category
    }, { category: category, mass: mass, size: size, name: name }, function (err) {
        if (!err) {
            res.send('updated');
        }
    });
});
app.post("/delete", cors(), function (req, res) {
    var _a = req.body, category = _a.category, mass = _a.mass, size = _a.size, name = _a.name;
    Animal.remove({
        category: category
    }, function (err) {
        if (!err)
            res.send('removed');
    });
});
server.listen(config.APP_PORT, "0.0.0.0", function () {
    console.log('server run at ' + config.APP_HOST + ':' + config.APP_PORT);
});
