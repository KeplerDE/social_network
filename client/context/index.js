import { useState, createContext } from "react";

const UserContext = createContext();

// Создание провайдера для контекста
const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
