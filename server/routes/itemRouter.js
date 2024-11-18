const Router = require('express')
const router = new Router()
const ItemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/',ItemController.getAllItem)
router.get('/:id',ItemController.getItem)
router.post('/', checkRole('ADMIN'),  ItemController.addItem); 
router.delete('/', checkRole('ADMIN'),  ItemController.removeItem); 
router.patch('/change',checkRole("ADMIN", ItemController.change))
router.patch('/changeCountPrice',checkRole("ADMIN", ItemController.changeCountPrice))

module.exports = router
