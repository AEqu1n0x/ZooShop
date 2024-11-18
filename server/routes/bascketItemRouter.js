const Router = require('express')
const router = new Router()
const bascketItemController = require('../controllers/bascketItemController')

router.get('/',bascketItemController.getItemInBascket)
router.post('/', bascketItemController.addItemToBasket); 
router.delete('/', bascketItemController.removeItemFromBasket); 



module.exports = router