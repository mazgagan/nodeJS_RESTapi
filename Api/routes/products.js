const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing the product.js file to make use of thye Product model
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    // find() with no args will find all elements
    //you can alsoa dd more queryParameters here
    //like find().where() to add more conditions to the query
    //like find().limit() to only fetch a smaller number and you can manually implement some pagination
    //.select() is used to select teh fields that is to be shown in response.
    //.select() overwrites teh default fields displayed
    Product.find()
        .select("name price  _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs
            };
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(response);
            } else {
                res.status(200).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //save is a method provided by mongoose which can be used on mongoose models
    //save will then store this on the database
    //and we will log teh result of the operation into console
    //and also we will catch any error and log it to the console
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests in products",
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entr found for the provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

module.exports = router;