const { Item, Bascket, BascketItem, ItemCount } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

class BascketController {
  async getBasсket(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      const basket = await Bascket.findOne({ where: { userId } });

      // Проверяем, существует ли корзина для данного пользователя
      if (!basket) {
        return next(ApiError.badRequest("Корзина не найдена для данного пользователя"));
      }

      // Получаем все товары в корзине пользователя
      const basketItems = await BascketItem.findAll({
        where: { bascketId: basket.id },
        include: [{ model: Item }, { model: ItemCount }],
      });
      return res.json(basketItems);
    } catch (e) {
      next(ApiError.internal("Ошибка при получении корзины: " + e.message));
    }
  }

  async addToBascket(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      const basket = await Bascket.findOne({ where: { userId } });

      // Проверяем, существует ли корзина для данного пользователя
      if (!basket) {
        return next(ApiError.badRequest("Корзина не найдена для данного пользователя"));
      }

      // Получаем id предмета из запроса
      const { itemId } = req.body;

      // Проверяем, существует ли предмет с указанным id
      const item = await Item.findByPk(itemId);
      if (!item) {
        return next(ApiError.badRequest("Предмет не найден"));
      }

      // Находим запись в таблице ItemCount по itemId
      const itemCount = await ItemCount.findOne({ where: { itemId } });
      if (!itemCount) {
        return next(ApiError.badRequest("Запись о количестве товара не найдена"));
      }

      // Проверяем, есть ли уже этот товар в корзине пользователя
      let basketItem = await BascketItem.findOne({ where: { bascketId: basket.id, itemId } });
      if (basketItem) {
        // Если уже есть, возвращаем сообщение о том, что товар уже в корзине
        return res.status(400).json({ message: "Товар уже добавлен в корзину" });
      } else {
        // Если нет, добавляем новую запись в корзину
        basketItem = await BascketItem.create({ bascketId: basket.id, itemId, itemCountId: itemCount.id });
        return res.json({ message: "Товар успешно добавлен в корзину" });
      }
    } catch (e) {
      next(ApiError.internal("Ошибка при добавлении товара в корзину: " + e.message));
    }
  }

  async removeFromBascket(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      const basket = await Bascket.findOne({ where: { userId } });

      // Проверяем, существует ли корзина для данного пользователя
      if (!basket) {
        return next(ApiError.badRequest("Корзина не найдена для данного пользователя"));
      }

      // Получаем id товара для удаления из запроса
      const { itemId } = req.body;

      // Проверяем, существует ли запись о товаре в корзине пользователя
      const basketItem = await BascketItem.findOne({ where: { bascketId: basket.id, itemId } });

      if (!basketItem) {
        return next(ApiError.badRequest("Товар не найден в корзине"));
      }

      // Удаляем запись о товаре из корзины
      await basketItem.destroy();

      return res.json({ message: "Товар успешно удален из корзины" });
    } catch (e) {
      next(ApiError.internal("Ошибка при удалении товара из корзины: " + e.message));
    }
  }

  async clearBascket(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;
  
      const basket = await Bascket.findOne({ where: { userId } });
  
      // Проверяем, существует ли корзина для данного пользователя
      if (!basket) {
        return next(ApiError.badRequest("Корзина не найдена для данного пользователя"));
      }
  
      // Удаляем все записи о товарах в корзине пользователя
      await BascketItem.destroy({ where: { bascketId: basket.id } });
  
      return res.json({ message: "Корзина успешно очищена" });
    } catch (e) {
      next(ApiError.internal("Ошибка при очистке корзины: " + e.message));
    }
  }
  
}

module.exports = new BascketController();
