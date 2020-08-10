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
    nodemon monitor file change and triggle command ts-nod e
    ts-node compile index.ts into index.js by tsconfig.json setting

### Setting monngoDB  
    $ npm install --save mongoose

### deploy mongodb docker.
    $ docker run --name mongodb -v $(pwd)/data:/data/db -d -p 27017:27017 mongo
    stop then delete
    $ docker run --name mongodb -v $(pwd)/data:/data/db -d -p 27017:27017 --rm mongo

### node unit test
    $ npm install jest --save-dev
    
    scripts: {
        "test": "jest"
    }
    
    $ npm run test 

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


### resources :
https://www.thepolyglotdeveloper.com/2019/02/developing-graphql-api-nodejs-mongodb/

https://www.youtube.com/watch?v=0bYf1wcOK9o&feature=emb_title

http://crowdforthink.com/blogs/a-simple-crud-app-using-graphql-nodejs-and-mongodb?fbclid=IwAR2WHJz4nVHKk2jvCLo1rxTrbP73VWxMI4_yok-uUiM-41_i9igqii1h-Xw

---

# Run app in container
$docker run --name mongoosecrud -d -p 27017:27017 kingbike/mongoosecrud -e DB_HOST=192.168.157.131

#### How to fix docker: Got permission denied issue
    $ sudo groupadd docker
    Add your user to the docker group.
    $ sudo usermod -aG docker $USER
    Run the following command or Logout and login again and run (that doesn't work you may need to reboot your machine first)
    $ newgrp docker
    change socket without enough permission for the 'docker' group.
    $ sudo chmod 666 /var/run/docker.sock
    Check if docker can be run without root
    $ docker run hello-world

---
# CircleCI :
.circleci/config.yml  is  auto general by CircleCI. app.


#### fix ssh access step: 
    jerry@ubuntu:~$ ssh-keygen -E md5 -lf ~/.ssh/id_rsa
    2048 MD5:1e:f1:e8:f4:54:c5:f0:a5:bf:ad:45:81:9c:e8:dd:0c jerry@ubuntu (RSA)
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

###  fix :  /bin/bash: /usr/local/bin/docker-entrypoint.sh: Permission denied
    sudo snap remove --purge docker
    sudo apt remove docker
    sudo apt remove docker-compose
    sudo apt remove docker.io
    sudo snap install docker



