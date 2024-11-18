const Router = require('express')
const router = new Router()
const itemPetController = require('../controllers/itemPetController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), itemPetController.additemPet)
router.get('/',itemPetController.getitemPet)
router.delete('/', checkRole('ADMIN'), itemPetController.removeitemPet)

module.exports = router