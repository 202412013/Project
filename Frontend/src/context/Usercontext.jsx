import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";



const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
        if (err.response && err.response.status === 401) {
            //   console.log("🔴 User not logged in or token expired");
              setUser(null);
        }
        else{
            console.error("⚠️ Error fetching user:", err.message);
        }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
