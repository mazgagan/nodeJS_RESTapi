/*
This file is to define how a product should look like for mongodb.
*/
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: false }
});

//now we need to export the schema wrapped into a model.
//Schema is like the layout or design of the object you want to use. 
// The model is the object itself which gives you a constructor to build such object based on that schema.
//Below model function takes two arguments--> 
//the name of the model that you will used internally 
//and the schema
module.exports = mongoose.model('Product', productSchema);