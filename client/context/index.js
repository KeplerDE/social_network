import { useState, createContext, useEffect } from "react";

const UserContext = createContext();

// Создание провайдера для контекста
const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    const auth = window.localStorage.getItem('auth');
    if (auth) {
      setState(JSON.parse(auth));
    }
  }, []);
  


  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
