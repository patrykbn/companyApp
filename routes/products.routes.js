const express = require('express');
const router = express.Router();

const ProductsController = require('../controller/products.controller');

router.get('/products', ProductsController.getAll);
router.get('/products/random', ProductsController.getRandom);
router.get('/products/:id', ProductsController.getById);
router.post('/products', ProductsController.addNew);
router.put('/products/:id', ProductsController.edit);
router.delete('/products/:id', ProductsController.delete);

module.exports = router;