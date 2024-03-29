// pages/user/dashboard.js
import React, { useContext } from 'react';
import UserRoute from '../../components/routes/UserRoute'; // Исправленный путь
import { UserContext } from '../../context'; // Возможно, также потребуется изменить

const Dashboard = () => {
  const [state] = useContext(UserContext);

  return (
    <UserRoute> 
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center">Dashboard page</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
