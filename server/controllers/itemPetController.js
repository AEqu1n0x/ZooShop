const { ItemPet } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require('fs');

class itemPetController {
  async getitemPet(req, res) {
    const pet = await ItemPet.findAll();
    return res.json(pet);
  }

  async additemPet(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const pet = await ItemPet.create({ name, img: fileName });
      return res.json(pet);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeitemPet(req, res) {
    const { id } = req.body; // Получаем ID типа товара из параметров запроса
    const pet = await ItemPet.findOne({ where: { id } });
    if (!pet) {
      return res.status(404).json({ message: "Тип животного не найден" });
    }

    const deletedPet = await ItemPet.destroy({ where: { id } });
    if (deletedPet) {
      // Удаляем изображение из папки static
      const imagePath = path.resolve(__dirname, '..', 'static', pet.img);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении изображения:', err);
        } else {
          console.log('Изображение успешно удалено');
        }
      });
      
      return res.json({ message: "Тип животного успешно удален" });
    }
  }
  
}

module.exports = new itemPetController();
