// components/routes/UserRoute.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import { UserContext } from '../../context';

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const { state } = useContext(UserContext);



  useEffect(() => {
    if (state?.token) {
      console.log('Token exists, getting current user...');
      getCurrentUser();
    } else {
      console.log('No token found, redirecting to login...');
      router.push('/login');
    }
  }, [state, router]);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log('Current user data:', response.data);
      if (response.data.ok) {
        setOk(true);
      }
    } catch (err) {
      console.error('Error getting current user:', err);
      router.push('/login');
    }
  };

  // Если состояние не определено, показываем индикатор загрузки
  if (state === undefined) {

    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ClipLoader size={150} color={'#123abc'} loading={true} />
      </div>
    );
  }

  // Если проверка прошла успешно, отображаем дочерние элементы

  return ok ? (
    children
  ) : (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ClipLoader size={150} color={'#123abc'} loading={true} />
    </div>
  );
};

export default UserRoute;
