import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";


export const AuthContext = React.createContext();
export function AuthProviderWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  /* Store the token in the local storage */
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  /* Authenticate the User via JWT */
  const authenticateUser = () => {

    // Get the stored token from the local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const userData = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(userData);
          console.log("Logged in as:", userData.username)
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.log("Failed to log")
    }
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);


  return (

    <AuthContext.Provider value={{
      isLoggedIn,
      isLoading,
      user,
      storeToken,
      authenticateUser,
      logOut
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}