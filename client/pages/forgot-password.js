import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { UserContext } from '../context';
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  // State hooks for form fields
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { state } = useContext(UserContext);

  // Handler for form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // console.log(name, email, password, secret);
    setLoading(true);
    const { data } = await axios.post(`/forgot-password`, {
      email,
      newPassword,
      secret,
    });
 
    console.log("forgot password res => ", data);
 
    if (data.error) {
      toast.error(data.error);
      setLoading(false);
    }
 
    if (data.success) {
      setEmail("");
      setNewPassword("");
      setSecret("");
      setOk(true);
      setLoading(false);
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

  if (state && state.token) router.push("/");

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Forgot Password</h1>
        </div>
      </div>

      {loading && <h1>Loading...</h1>}

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
