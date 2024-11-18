const Router = require('express')
const router = new Router()
const BrandsController = require('../controllers/itemBrandsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), BrandsController.addBrand)
router.get('/',BrandsController.getBrand)
router.delete('/', checkRole('ADMIN'), BrandsController.removeBrand)

module.exports = router
