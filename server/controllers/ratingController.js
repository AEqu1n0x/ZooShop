const { Users, Rating, Item } = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');


class ratingController {
  async getrating(req, res, next) {
    try {
      const itemId = req.query.itemId;
  
      // Получаем все отзывы для данного товара
      const ratings = await Rating.findAll({ where: { itemId } });
  
      return res.json(ratings);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addrating(req, res, next) {
    try {
      const { advantage, disadvantage, comment, rate, itemId } = req.body;
  
      // Получаем токен из заголовка запроса
      const token = req.headers.authorization.split(' ')[1]; // Предполагается, что токен передается в заголовке Authorization
  
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      // Извлекаем id пользователя из декодированного токена
      const userId = decoded.id; 
  
      // Добавляем запись в таблицу Rating с использованием userId
      const rating = await Rating.create({ advantage, disadvantage, comment, rate, userId, itemId });
  
      // Получаем все оценки для данного товара
      const ratings = await Rating.findAll({ where: { itemId } });
  
      // Вычисляем среднюю оценку
      const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);
      const averageRating = Math.round(totalRating / ratings.length);
  
      // Обновляем поле rating в таблице Item
      await Item.update({ rating: averageRating }, { where: { id: itemId } });
  
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removerating(req, res, next) {
    try {
      const { id } = req.body;
      // Находим запись в таблице Rating по ее id
      const rating = await Rating.findOne({ where: { id } });
      if (!rating) {
        return res.status(404).json({ message: "Отзыв не найден" });
      }

      const itemId = rating.itemId;

      // Удаляем запись в таблице Rating
      await rating.destroy();

      // Получаем все оценки для данного товара
      const ratings = await Rating.findAll({ where: { itemId } });

      // Вычисляем среднюю оценку
      let averageRating = 0;
      if (ratings.length > 0) {
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);
        averageRating = Math.round(totalRating / ratings.length);
      }
      // Обновляем поле rating в таблице Item
      await Item.update({ rating: averageRating }, { where: { id: itemId } });

      return res.json({ message: "Отзыв успешно удален" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ratingController();
