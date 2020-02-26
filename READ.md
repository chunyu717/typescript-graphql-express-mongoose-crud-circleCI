TypeScript part 
=======================================================================================
1- 初始化 Node.js
    1. 建立 Node.js project package.json.
    $ npm init -y
    2. 安裝 TypeScript
    $ npm install typescript — save-dev
    3. 加入 node.d.ts
    $ npm install @types/node — save-dev
    4. 加入 TypeScript 的設定檔案 tsconfig.json
    $ npx tsc — init

2- 建立開發環境 Live Compile + Run
    1. 加入實時編譯模組 ts-node
    $ npm install ts-node --save-dev
    2. 加入 nodemon ，當任何檔案發生改變，觸發執行 ts-node
    npm install nodemon --save-dev
    3. 將 script 設定入加 package.json
    "scripts": {
        "start": "npm run build:live",
        "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts",
        "build": "tsc index.ts"
    },

下載範例 index.ts, 通過 npm run start 進行開發:

3- Production 編譯 js
    tsc 是編譯 .ts 到 .js 的編譯工具，作用編譯 production 的靜態 Javascript 文檔：
    $ npm run build
    Remark
    nodemon 用來監察檔案的改變，重新觸發 command ts-node
    ts-node 通過 tsconfig.json 的設定，對 index.ts 進行自動編譯成為 js


monngoDB part 
=======================================================================================
$ npm install --save mongoose

先建立 Schema ,  包成 model 後 export ；  Schema 定義型態， Schema 可以定義自己的 method. 
Schema 有點像是 java hibernate 的 entity   ；  model 像是 value object (VO)

# moogose connect 依照 warning 的提醒加了一些 attribute. 
mongoose.connect('mongodb://127.0.0.1/todo', { useUnifiedTopology: true, useNewUrlParser: true });

# Parse request body 
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

# 記得 request 要加 
--header "Content-Type: application/json" 
req.body 才取得東西

req.query 是取 parameter .



deploy mongodb docker.
docker run --name mongodb -v $(pwd)/data:/data/db -d -p 27017:27017 --rm mongo

