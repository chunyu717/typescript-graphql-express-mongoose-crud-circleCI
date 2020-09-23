// ./models/Animal.js
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  size: String,
  mass: Number,
  category: {
    type: String,
    default: 'on land'
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  //versionKey: false   this parameter will not let db add '_v' attribute 
});

// instance method (for document use)
AnimalSchema.methods.getCategory = function() {
  // 'this' here  is the object created by constructor
  console.log(`This animal is belongs to ${this.category}`);
};

// the other way to write instance method.   jerry : code below will make error
// AnimalSchema.methods('getName', function() {
//   console.log(`The animal is ${this.name}`);
// });

// Compile Schema will export Model，you can use the Model to create and store document
// this will create 'animals' collection in mongo.
module.exports = mongoose.model('Animal', AnimalSchema);