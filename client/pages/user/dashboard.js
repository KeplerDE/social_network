import React, { useContext } from 'react';
import UserRoute from '../../components/routes/UserRoute';
import { UserContext } from '../../context';
import CreatePostForm from '../../components/forms/CreatePostForm';

const Dashboard = () => {
  const state = useContext(UserContext);

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>

        <div className='row py-3'>
          <div className='col-md-8'>
            <CreatePostForm />
          </div>
          <div className='col-md-4'> 
            Sidebar
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;

