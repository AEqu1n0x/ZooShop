const Router = require('express')
const router = new Router()
const bascketController = require('../controllers/bascketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('USER'), bascketController.getBasсket)
router.post('/', checkRole('USER'), bascketController.addToBascket); // Добавление товара в корзину
router.delete('/deleteItem', checkRole('USER'), bascketController.removeFromBascket); // Удаление товара из корзины
router.delete('/clear', checkRole('USER'), bascketController.clearBascket);  // Очистка корзины пользователя


module.exports = router