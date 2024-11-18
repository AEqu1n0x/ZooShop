const { Item, Orders, Bascket, BascketItem, ItemCount, OrdersItem, OrderDetails, Users } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

class ordersController {
  async getorder(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      // Находим все заказы пользователя
      const orders = await Orders.findAll({ where: { userId }, include: OrderDetails });

      // Создаем массив для хранения информации о заказах пользователя
      let userOrders = [];

      // Для каждого заказа получаем информацию о заказе и список заказанных товаров
      for (const order of orders) {
        const orderDetails = await OrderDetails.findOne({ where: { orderId: order.id } });
        const orderedItems = await OrdersItem.findAll({ where: { orderId: order.id }, include: Item });

        // Добавляем информацию о заказе и списках товаров в массив пользовательских заказов
        userOrders.push({
          orderDetails,
          orderedItems,
        });
      }

      return res.json({ userOrders });
    } catch (err) {
      next(ApiError.internal("Ошибка при получении информации о заказах: " + err.message));
    }
  }

  async getAllOrders(req, res) {
    try {
      // Находим все заказы
      const orders = await Orders.findAll();

      // Создаем массив для хранения информации о заказах
      let allOrders = [];

      // Для каждого заказа получаем информацию о заказе и список заказанных товаров
      for (const order of orders) {
        const orderDetails = await OrderDetails.findOne({ where: { orderId: order.id } });
        const orderedItems = await OrdersItem.findAll({ where: { orderId: order.id }, include: Item });

        // Добавляем информацию о заказе и списках товаров в общий массив заказов
        allOrders.push({
          orders,
          orderDetails,
          orderedItems,
        });
      }

      return res.json({ allOrders });
    } catch (err) {
      next(ApiError.internal("Ошибка при получении списка всех заказов: " + err.message));
    }
  }

  async addorder(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      const user = await Users.findByPk(userId);
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }

      const { name, surname, phone, email } = user;
      const { postcode, country, city, street, apartment, items } = req.body;

      const currentDate = new Date();
      const dateOrder = currentDate.toISOString(); // Форматируем текущую дату в строку
      const dateDelivery = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Добавляем неделю к текущей дате и форматируем в строку

      // Создаем запись в таблице Orders
      const order = await Orders.create({ userId });

      let totalPrice = 0;
      for (const item of items) {
        const { itemId, count } = item;
        const itemInfo = await Item.findByPk(itemId);
        if (!itemInfo) {
          return next(ApiError.badRequest("Товар с указанным ID не найден"));
        }
        totalPrice += itemInfo.price * count;
        await OrdersItem.create({
          price: itemInfo.price,
          count,
          orderId: order.id,
          itemId: itemInfo.id,
        });
        // Уменьшаем количество товара в таблице ItemCount
        await ItemCount.decrement("count", { by: count, where: { itemId } });
      }

      // Создаем запись в таблице OrderDetails
      await OrderDetails.create({
        name,
        surname,
        phone,
        email,
        postcode,
        country,
        city,
        street,
        apartment,
        totalPrice,
        dateOrder,
        dateDelivery,
        orderId: order.id,
      });

      // Очищаем корзину пользователя после оформления заказа
      const basket = await Bascket.findOne({ where: { userId } });
      await BascketItem.destroy({ where: { bascketId: basket.id } });

      return res.json({ message: "Заказ успешно оформлен" });
    } catch (e) {
      next(ApiError.internal("Ошибка при оформлении заказа: " + e.message));
    }
  }

  async removeorder(req, res, next) {
    try {
      const { id } = req.body;
  
      if (!id) {
        return next(ApiError.badRequest("Неверное значение идентификатора заказа"));
      }
      
      // Удаляем записи о заказанных товарах из таблицы OrdersItem
      await OrdersItem.destroy({ where: { orderId: id } });
  
      // Удаляем запись о деталях заказа из таблицы OrderDetails
      await OrderDetails.destroy({ where: { orderId: id } });
  
      // Удаляем сам заказ из таблицы Orders по его идентификатору
      await Orders.destroy({ where: { id: id } });
  
      return res.json({ message: "Заказ успешно удален" });
    } catch (err) {
      next(ApiError.badRequest("Ошибка при удалении заказа: " + err.message));
    }
  }
}

module.exports = new ordersController();
