# Env Setting (Nodejs, TypeScript, mongoose, MongoDB) 
---
### Initial Node.js for Typescript
    ceate Node.js project and package.json.
    $ npm init -y
    install TypeScript
    $ npm install typescript — save-dev
    add node.d.ts (typescript Declaration Files)
    $ npm install @types/node — save-dev
    add TypeScript tsconfig.json
    $ npx tsc — init

### Setting for Live Compile + Run
    add realtime compile module ts-node
    $ npm install ts-node --save-dev
    Add nodemon, while file changes it will triggle ts-node
    $ npm install nodemon --save-dev
        add the script to  package.json , command to start develop  $npm run start 
        "scripts": {
            "start": "npm run build:live",
            "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts",
            "build": "tsc index.ts"
        },

    $ npm run build     // tsc is compile tool compile .ts to .js 
    nodemon monitor file change and triggle command ts-node
    ts-node compile index.ts into index.js by tsconfig.json setting

### Setting monngoDB  
$ npm install --save mongoose

### deploy mongodb docker.
$ docker run --name mongodb -v $(pwd)/data:/data/db -d -p 27017:27017 --rm mongo

## Project brief 
---
1. Edit Schema (Schema defind the type and customized  method.)   => make it be model then export ；  
2. Schema like  java hibernate 的 entity; model like value object (VO)
3. CRUD with moongoose 

### moogose connect ( I added some atrribute depend on waning msg. )
    mongoose.connect('mongodb://127.0.0.1/todo', { useUnifiedTopology: true, useNewUrlParser: true });

### Parse request body 
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

### request header must add :  Content-Type: application/json
"req.body" to get reques body
"req.query" to get  parameter .


