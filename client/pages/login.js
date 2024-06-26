import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'; 
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm"; 
import { UserContext } from "../context";



const Login = () => {
  // Использование хуков состояния для управления полями формы и состоянием загрузки
  const [email, setEmail] = useState("test@gmail.com"); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 


  const { state, setState } = useContext(UserContext);



  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      // Отправляем POST-запрос на сервер для аутентификации
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update context
        setState({
          user: data.user,
          token: data.token,
      });
        // save in local storage
        window.localStorage.setItem('auth',JSON.stringify(data));
        router.push('/')
      } 
    } catch (err) {
      // Обработка ошибок, если что-то пошло не так
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  
  if (state && state.token) router.push("/");
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


      <div className="row">
        <div className="col">
          <p className="text-center">
            <Link className="text-danger" href="/forgot-password">
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    </div>

    
  );
};

export default Login;
