import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed and imported
import { toast } from 'react-toastify' 

const Register = () => {
  // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk ] = useState(false);

  // Handlers for form field changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSecretChange = (e) => setSecret(e.target.value);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
          // Post data to server using axios
      const { data } = await axios.post("http://localhost:8000/api/register", { 
        name, 
        email, 
        password, 
        secret 
      });
      setOk(res.data.ok)
    } catch (err) {
        toast.error(err.response.data); 
    }

      // .then((res) => setOk(res.data.ok))
      // .catch((err) => toast.error(err.response.data));
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <small>
                <label className="text-muted">Your name</label>
              </small>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter name" 
                value={name} 
                onChange={handleNameChange} 
              />
            </div>
            <div className="form-group">
              <small>
                <label className="text-muted">Email address</label>
              </small>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email" 
                value={email} 
                onChange={handleEmailChange} 
              />
            </div>
            <div className="form-group">
              <small>
                <label className="text-muted">Password</label>
              </small>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password" 
                value={password} 
                onChange={handlePasswordChange} 
              />
            </div>
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Pick a question</label>
              </small>
              <select 
                className="form-control" 
                value={secret} 
                onChange={handleSecretChange}
              >
               <option value="">Select a security question</option>
                <option value="favourite-color">What is your favourite color?</option>
                <option value="best-friend">What is your best friend's name?</option>
                <option value="birth-city">What city were you born in?</option>
              </select>
              <small className="form-text text-muted">
                You can use this to reset your password if forgotten.
              </small>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Write your answer here" 
                value={secret} 
                onChange={handleSecretChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-clock">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;