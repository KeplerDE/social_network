const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

exports.register = async (req, res) => {
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
  console.log("REGISTERED USER => ", user);
  try {
    // Сохранение пользователя в базу данных
    await user.save();
    console.log("REGISTERED USER => ", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};
