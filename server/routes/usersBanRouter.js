const Router = require('express')
const router = new Router()
const usersBanController = require('../controllers/usersBanController')

router.post('/',usersBanController.addusersBan)
router.get('/',usersBanController.getusersBan)
router.delete('/',usersBanController.removeusersBan)

module.exports = router