const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

//Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    const hostname = req.hostname;
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://' + hostname + "/orders/" + doc._id
                        }
                    }
                }),
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const hostname = req.hostname;
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://' + hostname + '/orders/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:orderId', (req, res, next) => {
    const hostname = req.hostname;
    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            } else {
                return res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'http://' + hostname + '/orders/'
                    }
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/:orderId', (req, res, next) => {
    const hostname = req.hostname;
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
                request: {
                    type: 'GET',
                    url: 'http://' + hostname + '/orders/'
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;