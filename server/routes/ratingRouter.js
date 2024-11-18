const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('USER'), ratingController.addrating)
router.get('/',ratingController.getrating)
router.delete('/', checkRole('ADMIN'), ratingController.removerating)

module.exports = router
