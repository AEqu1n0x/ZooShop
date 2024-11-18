const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    phone: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const BannedUser = sequelize.define('banned_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    adminID: {type: DataTypes.INTEGER},
    reason: {type: DataTypes.STRING},
})

const ItemPet = sequelize.define('item_pet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deliveryTrue: {type: DataTypes.STRING},
    advantage: {type: DataTypes.STRING},
    disadvantage: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
    rate: {type: DataTypes.INTEGER},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    imgMain: {type: DataTypes.STRING}, 
    img1: {type: DataTypes.STRING},
    img2: {type: DataTypes.STRING},
    img3: {type: DataTypes.STRING},
})

const ItemDescription = sequelize.define('item_description', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})


const ItemCount = sequelize.define('item_count', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER},
})

const ItemBrands = sequelize.define('item_brands', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
})

const ItemTypes = sequelize.define('item_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
})

const Bascket = sequelize.define('bascket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BascketItem = sequelize.define('bascket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, defaultValue: "В обработке"},
})

const OrdersItem = sequelize.define('orders_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER},
    count: {type: DataTypes.INTEGER},
})

const OrderDetails = sequelize.define('order_details', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    postcode: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    street: {type: DataTypes.STRING},
    apartment: {type: DataTypes.STRING},
    totalPrice: {type: DataTypes.INTEGER},
    dateOrder: {type: DataTypes.STRING},
    dateDelivery: {type: DataTypes.STRING},
})

const Coupons = sequelize.define('coupons', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, unique: true},
    discount: {type: DataTypes.INTEGER},
})


Users.hasOne(BannedUser)
BannedUser.belongsTo(Users)

Users.hasMany(Rating)
Rating.belongsTo(Users)

Users.hasOne(Bascket)
Bascket.belongsTo(Users)

Users.hasMany(Orders)
Orders.belongsTo(Users)

Orders.hasOne(OrderDetails)
OrderDetails.belongsTo(Orders)

Orders.hasOne(OrdersItem)
OrdersItem.belongsTo(Orders)

Bascket.hasMany(BascketItem)
BascketItem.belongsTo(Bascket)

Item.hasMany(ItemDescription, {as:"info"})
ItemDescription.belongsTo(Item)

ItemBrands.hasMany(Item)
Item.belongsTo(ItemBrands)

ItemTypes.hasMany(Item)
Item.belongsTo(ItemTypes)

Item.hasMany(Rating)
Rating.belongsTo(Item)

ItemPet.hasMany(Item)
Item.belongsTo(ItemPet)

Item.hasMany(ItemCount, {as:"infoCount"})
ItemCount.belongsTo(Item)

Item.hasOne(OrdersItem)
OrdersItem.belongsTo(Item)

ItemCount.hasMany(BascketItem)
BascketItem.belongsTo(ItemCount)

Item.hasOne(BascketItem)
BascketItem.belongsTo(Item)

module.exports = {
    Users,
    Rating,
    BannedUser,
    Bascket,
    BascketItem,
    Orders,
    OrderDetails,
    OrdersItem,
    Item,
    ItemBrands,
    ItemCount,
    ItemDescription,
    ItemTypes,
    ItemPet,
    Coupons
}