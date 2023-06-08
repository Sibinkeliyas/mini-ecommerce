const express = require('express')
const { add_user, login_user } = require('../controller/userController')
const { add_Product, find_Product } = require('../controller/productController')
const { createOrder, findOrder, addToCart, findCart  } = require('../controller/orderController')
const router = express()
const protect = require('../middleware/protect')



router.route('/add-user').post(add_user)

router.route('/login-user').post(login_user)

router.route('/add-product').post(protect ,add_Product)

router.route('/find-product').get(protect ,find_Product)

router.route('/add-cart').post(protect ,addToCart)

router.route('/find-cart').get(protect ,findCart)

router.route('/add-order').post(protect ,createOrder)

router.route('/get-order').get(protect ,findOrder)


module.exports = router