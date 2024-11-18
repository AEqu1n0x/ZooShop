const { Coupons } = require("../models/models");
const ApiError = require("../error/ApiError");


class CouponsController {
  async getCoupons(req, res) {
    const coupon = await Coupons.findAll();
    return res.json(coupon);
  }

  async addCoupons(req, res) {
      const { code , discount} = req.body;
      const coupon = await Coupons.create({ code , discount });
      return res.json(coupon)
  }

  async removeCoupons(req, res) {
    const { id } = req.body; // Получаем ID типа товара из параметров запроса
    const deletedCoupon = await Coupons.destroy({ where: { id } });
    if (deletedCoupon) {
      return res.json({ message: "Купон успешно удален" });
    }
  }
}

module.exports = new CouponsController();
