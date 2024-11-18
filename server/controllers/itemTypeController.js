const { ItemTypes } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require('fs');


class itemTypeController {
  async getitemType(req, res) {
    const types = await ItemTypes.findAll();
    return res.json(types);
  }

  async additemType(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const type = await ItemTypes.create({ name, img: fileName });
      return res.json(type);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeitemType(req, res) {
    const { id } = req.body; // Получаем ID типа товара из параметров запроса
    const type = await ItemTypes.findOne({ where: { id } });
    if (!type) {
      return res.status(404).json({ message: "Тип товара не найден" });
    }

    const deletedType = await ItemTypes.destroy({ where: { id } });
    if (deletedType) {
      // Удаляем изображение из папки static
      const imagePath = path.resolve(__dirname, '..', 'static', type.img);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении изображения:', err);
        } else {
          console.log('Изображение успешно удалено');
        }
      });
      
      return res.json({ message: "Тип товара успешно удален" });
    }
  }
  
}

module.exports = new itemTypeController();
