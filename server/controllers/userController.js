const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, Bascket, BannedUser } = require("../models/models");
const { Op } = require("sequelize");

const generateJwt = (id, name, surname, role, phone, email) => {
  return jwt.sign({ id, name, surname, role, phone, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const { name, surname, role, phone, email, password } = req.body;
    if (!name || !surname || !password || !phone || !email) {
      return next(ApiError.badRequest("Введены не все данные"));
    }

    const candidate = await Users.findOne({ where: { [Op.or]: [{ email }, { phone }] } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким email и phone уже существует"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await Users.create({ name, surname, role, phone, email, password: hashPassword });
    const bascket = await Bascket.create({ userId: user.id });
    const token = generateJwt(user.id, user.name, user.surname, user.role, user.phone, user.email);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { login, password } = req.body;
    const user = await Users.findOne({ where: { [Op.or]: [{ email: login }, { phone: login }] } });

    if (!user) {
      return next(ApiError.badRequest("Пользователь с таким логином не найден"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль"));
    }

    const token = generateJwt(user.id, user.name, user.surname, user.role, user.phone, user.email);

    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.surname, req.user.role, req.user.phone, req.user.email);
    return res.json({token})
  }

  async banUser(req, res, next) {
    try {
      // Получаем токен из заголовка запроса
      const token = req.headers.authorization.split(' ')[1];
  
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      // Извлекаем id администратора из декодированного токена
      const adminID = decoded.id;
  
      const { userId, reason } = req.body;
  
      // Находим пользователя, которого нужно забанить
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }
  
      // Меняем роль пользователя на "banned"
      user.role = "BANNED";
      await user.save();
   
      // Создаем запись о бане в таблице BannedUser
      await BannedUser.create({ userId, adminID, reason });
  
      return res.json({ message: "Пользователь заблокирован" });
    } catch (e) {
      next(ApiError.internal("Ошибка при бане пользователя: " + e.message));
    }
  }
  async cabinet(req, res, next) {
    try {
      // Получаем токен из заголовка запроса
      const token = req.headers.authorization.split(' ')[1];
    
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
      // Извлекаем id пользователя из декодированного токена
      const userId = decoded.id;
    
      // Находим пользователя по userId
      const user = await Users.findByPk(userId);
    
      if (!user) {
        return next(ApiError.notFound("Пользователь не найден"));
      }
    
      // Возвращаем информацию о пользователе
      return res.json(user);
    } catch (e) {
      next(ApiError.internal("Ошибка при получении информации о пользователе: " + e.message));
    }
  }

  async getAllUsers(req, res, next) {
    try {
      // Получаем всех пользователей из таблицы Users
      const users = await Users.findAll();
    
      // Возвращаем список пользователей
      return res.json(users);
    } catch (e) {
      next(ApiError.internal("Ошибка при получении списка пользователей: " + e.message));
    }
  }
}

module.exports = new UserController();
