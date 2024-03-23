// Импорт необходимых зависимостей
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'; // Добавляем для программной навигации
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm"; // Уточните путь в соответствии с вашей структурой проекта

const Login = () => {
  // Использование хуков состояния для управления полями формы и состоянием загрузки
  const [email, setEmail] = useState("test@gmail.com"); // Значение по умолчанию для email
  const [password, setPassword] = useState(""); // Значение по умолчанию для password
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Инициализируем хук для использования роутера

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      // Отправляем POST-запрос на сервер для аутентификации
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
        email,
        password,
      });
      console.log(data)
      // Обработка полученных данных
      console.log(data);
      router.push('/'); // Перенаправляем пользователя на главную страницу после успешного входа
    } catch (err) {
      // Обработка ошибок, если что-то пошло не так
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  // JSX для отрисовки формы входа
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registred?{" "}
            <Link href="/register">
              <span>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
