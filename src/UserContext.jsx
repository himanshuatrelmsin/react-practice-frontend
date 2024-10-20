import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    if (storedUser && loginTimestamp) {
      const currentTime = new Date().getTime();
      const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
      if (currentTime - loginTimestamp > twoHoursInMilliseconds) {
        setUser(null); // Logout the user if session expired
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
