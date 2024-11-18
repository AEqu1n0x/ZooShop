const { Item, ItemDescription, ItemCount } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class ItemController {
  async getItem(req, res) {
    const { id } = req.params;
    const item = await Item.findOne({
      where: { id },
      include: [
        { model: ItemDescription, as: "info" },
        { model: ItemCount, as: "infoCount" },
      ],
    });
    return res.json(item);
  }

  async getAllItem(req, res) {
    let { itemTypeId, itemBrandId, itemPetId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;  
    let offset = page * limit - limit;

    let items;
    // ничего нет
    if (!itemTypeId && !itemBrandId && !itemPetId) {
      items = await Item.findAndCountAll({ limit, offset });
    }
    // только тип
    if (itemTypeId && !itemBrandId && !itemPetId) {
      items = await Item.findAndCountAll({ where: { itemTypeId }, limit, offset });
    }
    // только бренд
    if (!itemTypeId && itemBrandId && !itemPetId) {
      items = await Item.findAndCountAll({ where: { itemBrandId }, limit, offset });
    }
    // только животное
    if (!itemTypeId && !itemBrandId && itemPetId) {
      items = await Item.findAndCountAll({ where: { itemPetId }, limit, offset });
    }
    // тип и бренд
    if (itemTypeId && itemBrandId && !itemPetId) {
      items = await Item.findAndCountAll({ where: { itemTypeId, itemBrandId }, limit, offset });
    }
    // бренд и животное
    if (!itemTypeId && itemBrandId && itemPetId) {
      items = await Item.findAndCountAll({ where: { itemBrandId, itemPetId }, limit, offset });
    }
    // тип и животное
    if (itemTypeId && !itemBrandId && itemPetId) {
      items = await Item.findAndCountAll({ where: { itemTypeId, itemPetId }, limit, offset });
    }
    // все
    if (itemTypeId && itemBrandId && itemPetId) {
      items = await Item.findAndCountAll({ where: { itemTypeId, itemBrandId, itemPetId }, limit, offset });
    }
    return res.json(items);
  }

  async addItem(req, res, next) {
    try {
      let { name, price, itemTypeId, itemBrandId, itemPetId, info, infoCount } = req.body;
      const { imgMain, img1, img2 } = req.files;
      let fileName = uuid.v4() + ".jpg";
      let fileName1 = uuid.v4() + "_1.jpg";
      let fileName2 = uuid.v4() + "_2.jpg";

      imgMain.mv(path.resolve(__dirname, "..", "static", fileName));
      img1.mv(path.resolve(__dirname, "..", "static", fileName1));
      img2.mv(path.resolve(__dirname, "..", "static", fileName2));

      const item = await Item.create({
        name,
        price,
        itemTypeId,
        itemBrandId,
        itemPetId,
        imgMain: fileName,
        img1: fileName1,
        img2: fileName2,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ItemDescription.create({
            title: i.title,
            description: i.description,
            itemId: item.id,
          })
        );
      } else {
        return res.status(404).json({ message: "Не получена информация об описании" });
      }
      if (infoCount) {
        info = JSON.parse(infoCount);
        info.forEach((i) =>
          ItemCount.create({
            count: i.count,
            itemId: item.id,
          })
        );
      } else {
        return res.status(404).json({ message: "Не получена информация о количестве" });
      }
      return res.json(item);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeItem(req, res) {
    const { id } = req.body; // Получаем ID типа товара из параметров запроса
    const item = await Item.findOne({ where: { id } });
    if (!item) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    // Удаляем связанные записи из таблиц ItemDescription и ItemCount
    await ItemDescription.destroy({ where: { itemId: id } });
    await ItemCount.destroy({ where: { itemId: id } });

    // Удаляем изображения из папки static
    const imagesToDelete = [item.imgMain, item.img1, item.img2];
    imagesToDelete.forEach((image) => {
      const imagePath = path.resolve(__dirname, "..", "static", image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении изображения:", err);
        } else {
          console.log("Изображение успешно удалено");
        }
      });
    });

    // Удаляем товар из базы данных
    const deletedItem = await Item.destroy({ where: { id } });
    if (deletedItem) {
      return res.json({ message: "Товар успешно удален" });
    } else {
      return res.status(500).json({ message: "Не удалось удалить товар" });
    }
  }

  async change(req, res) {}
}



module.exports = new ItemController();
