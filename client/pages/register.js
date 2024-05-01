import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { UserContext } from '../context';
import AuthForm from "../components/forms/AuthForm";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (state?.token) {
      console.log("Redirecting because token exists");
      router.push("/");
    }
  }, [state, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted with:", { name, email, password: '[HIDDEN]', secret: '[HIDDEN]' });

    try {
      const response = await axios.post(`/register`, { name, email, password, secret });
      console.log("Registration response:", response.data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful, please login.");
        router.push('/login');
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.error || err.message || 'An unexpected error occurred';
      toast.error(errorMessage);
      console.error("Error details:", errorMessage);
    } finally {
      setLoading(false);
      console.log("Setting loading false");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>

      {loading && (
        <div className="row">
          <div className="col text-center">
            <h1>Loading...</h1>
          </div>
        </div>
      )}

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
