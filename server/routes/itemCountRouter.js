const Router = require('express')
const router = new Router()
const itemCountController = require('../controllers/itemCountController')

router.post('/',itemCountController.addItemCount)
router.get('/',itemCountController.getItemCount)
router.delete('/',itemCountController.removeItemCount)


module.exports = router