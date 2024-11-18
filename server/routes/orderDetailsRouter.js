const Router = require('express')
const router = new Router()
const orderDetailsController = require('../controllers/orderDetailsController')

router.post('/',orderDetailsController.addorderDetails)
router.get('/',orderDetailsController.getorderDetails)
router.delete('/',orderDetailsController.removeorderDetails)


module.exports = router