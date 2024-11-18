const Router = require('express')
const router = new Router()
const CouponsController = require('../controllers/couponsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), CouponsController.addCoupons)
router.get('/',CouponsController.getCoupons)
router.delete('/', checkRole('ADMIN'), CouponsController.removeCoupons)

module.exports = router
