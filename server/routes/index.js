const Router = require('express')
const router = new Router()

const itemBrandRouter = require('./itemBrandsRouter')
const itemTypesRouter = require('./itemTypesRouter')
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')

const bascketItemRouter = require('./bascketItemRouter')
const bascketRouter = require('./bascketRouter')
const couponRouter = require('./couponsRouter')
const countRouter = require('./itemCountRouter')
const descriptionRouter = require('./itemDescriptionRouter')
const petRouter = require('./itemPetRouter')
const orderDetailsRouter = require('./orderDetailsRouter')
const orderItemRouter = require('./ordersItemRouter')
const orderRouter = require('./ordersRouter')
const ratingRouter = require('./ratingRouter')
const banRouter = require('./usersBanRouter')


router.use('/user', userRouter)
router.use('/type', itemTypesRouter)
router.use('/brand', itemBrandRouter)
router.use('/item', itemRouter)
router.use('/pet', petRouter)
router.use('/rating', ratingRouter)
router.use('/coupon', couponRouter)
router.use('/bascket', bascketRouter)
router.use('/order', orderRouter)


router.use('/bascketItem', bascketItemRouter)
router.use('/orderDetails', orderDetailsRouter)
router.use('/orderItem', orderItemRouter)
router.use('/ban', banRouter)
router.use('/count', countRouter)
router.use('/description', descriptionRouter)



module.exports = router