const Router = require('express')
const router = new Router()
const itemDescriptionController = require('../controllers/itemDescriptionController')

router.post('/',itemDescriptionController.addItemDescription)
router.get('/',itemDescriptionController.getItemDescription)
router.delete('/',itemDescriptionController.removeItemDescription)


module.exports = router