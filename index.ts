const config = require('./config')
const express = require('express')
const app = express()
app.set('secret', config.secret)
app.use(express.static('build'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

//ssl & https 
var http = require('http');
const server = http.createServer( /*credentials,*/ app);

// MongoDB
//Import the mongoose module
const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://192.168.157.129/todo', { useUnifiedTopology: true, useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Animal = require('./models/Animal');

app.post( "/create", cors(), ( req: any, res: any) => {
    console.log('/create')
    const { category, mass, size, name } = req.body
      const elephant = new Animal({
        category: category,
        mass: mass,
        size: size,
        name: name
      });

      // console.log(elephant.category); //  Direct access  the type of elephant instance.  output => "on land"
      // elephant.getCategory(); //access elephant.category by method.  output => "This animal is belongs to on land"
      
      // store document
      elephant.save((err: any, elephant: any) => {
        if (err) {
          return console.error(err);
        }
        console.log('document saved');
        //db.close(); // this close the connection with db. if close you need to reconnect it
      });
      res.send( "Save OK!" );

  })
  app.post( "/read", cors(), ( req: any, res: any) => {
    Animal.findOne({
        category: req.body.category
    }, function(err: any, docs: any) {
        console.log('docs' , docs)
        if (docs.category === req.body.category) {
            res.send(docs);
            console.log(docs.category);
        } else {
            console.log(docs.category);
            res.send('cant find');
        }
    });
} );

app.post( "/update", cors(), ( req: any, res: any) => {
    const { category, mass, size, name } = req.body
    Animal.update({
        category: category
    }, { category: category, mass: mass,size: size, name: name},  function(err: any) {
        if(!err)
            res.send('updated');
    });

} );

app.post( "/delete", cors(), ( req: any, res: any) => {
    const { category, mass, size, name } = req.body
    Animal.remove({
        category: category
    },  function(err: any) {
        if(!err)
            res.send('removed');
    });

} );

server.listen( config.APP_PORT,"0.0.0.0",function(){
    console.log('server run at ' + config.APP_HOST  +  ':' + config.APP_PORT );
});