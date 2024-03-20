import { FaSpinner } from 'react-icons/fa';

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading
}) => (
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group ">
            <small>
                <label className="text-muted">Pick a question</label>
            </small>
            <select 
                className="form-control" 
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
            >
                <option value="">Select a security question</option>
                <option value="favourite-color">What is your favourite color?</option>
                <option value="best-friend">What is your best friend's name?</option>
                <option value="birth-city">What city were you born in?</option>
            </select>
        </div>
        <div className="form-group">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Write your answer here" 
                value={secret} 
                onChange={(e) => setSecret(e.target.value)}
            />
        </div>
        <div className='form-group p-2'>
            <button   
                disabled={!name || !password || !email || !secret } type="submit" className="btn btn-primary col-12"
            >
                {loading ? <FaSpinner className="py-1" /> : "Submit"}
            </button>
        </div>
    </form>
);

export default AuthForm;
