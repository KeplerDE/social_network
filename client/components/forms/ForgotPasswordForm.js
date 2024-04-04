import { FaSpinner } from 'react-icons/fa';

const ForgotPasswordForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setPassword,
    secret,
    setSecret,
    loading,
    page
}) => (
    <form onSubmit={handleSubmit}>

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
                <label className="text-muted">New password</label>
            </small>
            <input
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}  
                type="password" 
                className="form-control" 
                placeholder="Enter new password" 
            />
        </div>

        <div className="form-group">
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

        
        <div className='form-group'>
            <button   
                disabled={!email || !newPassword || !secret || loading} type="submit" 
                className="btn btn-primary col-12"
            >
                {loading ? <FaSpinner className="py-1" /> : "Submit"}
            </button>
        </div>
    </form>
);

export default ForgotPasswordForm;
