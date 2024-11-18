const Router = require('express')
const router = new Router()
const ordersItemController = require('../controllers/ordersItemController')

router.post('/',ordersItemController.addorderItem)
router.get('/',ordersItemController.getorderItem)
router.delete('/',ordersItemController.removeorderItem)

module.exports = router