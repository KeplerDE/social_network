import React, { useState, useContext } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify' 
import { useRouter } from 'next/router';
import { UserContext } from '../context'

import AuthForm from "../components/forms/AuthForm"


const Register = () => {
  // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk ] = useState(false);
  const [loading, setLoading ] = useState(false);
  const router = useRouter();

  const { state } = useContext(UserContext);


  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true);
          // Post data to server using axios
      const { data } = await axios.post(`/register`, { 
        name, 
        email, 
        password, 
        secret 
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setName('')
        setEmail('')
        setPassword('')
        setSecret('')
        setName('')
        setOk(data.ok)
        setLoading(false);
      }

      if(data.ok) {
        setOk(true);
        toast.success("Registration successful...");
        setLoading(false);
        // Redirect to login page
        router.push('/login');
      }
    } catch (err) {
        toast.error(err.response.data); 
    }
  };

  if (state && state.token) router.push("/");

  return (
    <div className="container-fluid">
      <div className="row py-5  text-light bg-default-image">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>

      {loading ? <h1>Loading</h1> : ''}


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