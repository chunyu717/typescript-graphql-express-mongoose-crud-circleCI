var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
mongoose.connect('mongodb://' + config.DB_HOST + '/todo', { useUnifiedTopology: true, useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Animal = require('./models/Animal');
//GraphQL 
mongoose.set('useFindAndModify', false);
var ExpressGraphQL = require("express-graphql");
var _a = require("graphql"), GraphQLID = _a.GraphQLID, GraphQLString = _a.GraphQLString, GraphQLList = _a.GraphQLList, GraphQLNonNull = _a.GraphQLNonNull, GraphQLObjectType = _a.GraphQLObjectType, GraphQLSchema = _a.GraphQLSchema;
var AnimalType = new GraphQLObjectType({
    name: "Animal",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString }
    }
});
var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            animals: {
                type: GraphQLList(AnimalType),
                resolve: function (root, args, context, info) {
                    return Animal.find().exec();
                }
            },
            animal: {
                type: AnimalType,
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: function (root, args, context, info) {
                    return Animal.findOne({ name: args.name }).exec();
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            createAnimal: {
                type: AnimalType,
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: function (root, args, context, info) {
                    var animal = new Animal(args);
                    //animal.save().then( (respp: any) => { console.log(  typeof(respp) )})  ; //object
                    return animal.save();
                }
            },
            updateAnimal: {
                type: AnimalType,
                args: {
                    name: { type: GraphQLNonNull(GraphQLString) },
                    newCategory: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: function (root, args, context, info) { return __awaiter(_this, void 0, void 0, function () {
                    var uAuthor;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Animal.findOneAndUpdate({ name: args.name }, { category: args.newCategory }, { "new": true }, function (err, res) {
                                    if (err) {
                                        console.log("Something wrong when updating data!");
                                    }
                                    console.log(res); //console.log( typeof(res)) ; //object
                                    //搞好久 不能直接 return 外面要一個變數接完再 return ;
                                    return res;
                                    //return Animal.findOne({ name: args.name});
                                })];
                            case 1:
                                uAuthor = _a.sent();
                                return [2 /*return*/, uAuthor];
                        }
                    });
                }); }
            }
        }
    })
});
app.use("/graphql", ExpressGraphQL({
    schema: schema,
    graphiql: true
}));
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
