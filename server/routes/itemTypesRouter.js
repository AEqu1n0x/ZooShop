const Router = require('express')
const router = new Router()
const itemTypeController = require('../controllers/itemTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), itemTypeController.additemType)
router.get('/',itemTypeController.getitemType)
router.delete('/', checkRole('ADMIN'), itemTypeController.removeitemType)

module.exports = router

