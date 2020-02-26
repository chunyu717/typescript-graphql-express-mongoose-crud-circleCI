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

// 載入 jwt 函式庫協助處理建立/驗證 token
// const jwt = require('jsonwebtoken')
// var morgan = require('morgan')
// app.use(morgan('dev'))

//ssl & https 
var http = require('http');
// const http = require('https');
// app.use(express.static('static'));
// const fs = require('fs');
// const privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
// const certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
// const credentials = { key: privateKey, cert: certificate };
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
      // 直接存取 elephant 這個 instance 的 type
      // console.log(elephant.category); // "on land"
      // 透過在 Model 中定義的 instance methods 取得 elephant 的 category
      // elephant.getCategory(); // "This animal is belongs to on land"
      
      // 儲存 document
      elephant.save((err: any, elephant: any) => {
        if (err) {
          return console.error(err);
        }
        console.log('document saved');
        db.close(); // 結束與 database 的連線
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