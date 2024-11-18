const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/ordersController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('USER'), ordersController.addorder)
router.get('/getOrders', checkRole('ADMIN'), ordersController.getAllOrders)
router.get('/order', checkRole('USER'), ordersController.getorder)
router.delete('/', checkRole('ADMIN'), ordersController.removeorder)

module.exports = router

