import React, {useState} from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setIsLoggedInHandler = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setIsLoggedInHandler }}>
      {children}
    </AuthContext.Provider>
  );
}