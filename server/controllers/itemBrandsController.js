const { ItemBrands } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require('fs');

class itemBrandsController {
  async getBrand(req, res) {
    const brand = await ItemBrands.findAll();
    return res.json(brand);
  }

  async addBrand(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const brand = await ItemBrands.create({ name, img: fileName });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeBrand(req, res) {
    const { id } = req.body; // Получаем ID типа товара из параметров запроса
    const brand = await ItemBrands.findOne({ where: { id } });
    if (!brand) {
      return res.status(404).json({ message: "Бренд товара не найден" });
    }

    const deletedBrand = await ItemBrands.destroy({ where: { id } });
    if (deletedBrand) {
      // Удаляем изображение из папки static
      const imagePath = path.resolve(__dirname, '..', 'static', brand.img);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении изображения:', err);
        } else {
          console.log('Изображение успешно удалено');
        }
      });
      return res.json({ message: "Бренд товара успешно удален" });
    }
  }

}

module.exports = new itemBrandsController();
