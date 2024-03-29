const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require('jsonwebtoken');


// Функция для регистрации нового пользователя
exports.register = async (req, res) => {
  try {
    // Получаем поля из тела запроса
    const { name, email, password, secret } = req.body;

    // Валидация полей
    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!password || password.length < 6) {
      return res.status(400).send("Password is required and should be at least 6 characters long");
    }
    if (!secret) {
      return res.status(400).send("Answer is required");
    }

    // Проверка, существует ли уже пользователь с таким email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).send("Email is already in use");
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание нового пользователя
    const user = new User({ name, email, password: hashedPassword, secret });

    // Сохранение пользователя в базу данных
    await user.save();
    console.log("REGISTERED USER => ", user);
    
    return res.json({ ok: true });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

// Экспорт функции login
exports.login = async (req, res) => {
  try {
    // Деструктуризация для получения email и password из тела запроса
    const { email, password } = req.body;

    // Проверка наличия пользователя в базе данных
    const user = await User.findOne({ email });
    if (!user) {
      // Если пользователь не найден, отправляем статус 400
      return res.status(400).send("No user found");
    }

    // Проверка соответствия пароля
    const match = await comparePassword(password, user.password);
    if (!match) {
      // Если пароль не совпадает, отправляем статус 400
      return res.status(400).send("Wrong password");
    }

    // Создание подписанного токена
    const token = jwt.sign(
      { _id: user._id }, // payload для токена
      process.env.JWT_SECRET, // секретный ключ для подписи токена
      { expiresIn: "7d" } // опция, указывающая срок действия токена
    );

    // Установка полей password и secret в undefined, чтобы они не возвращались клиенту
    user.password = undefined;
    user.secret = undefined;

    // Отправка ответа клиенту
    res.json({
      token,
      user,
    }); 
  } catch (err) {
    // Логирование ошибки
    console.log(err);
    // Отправка статуса 400 при любой другой ошибке
    return res.status(400).send("Error. Try again.");
  }
};


exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
