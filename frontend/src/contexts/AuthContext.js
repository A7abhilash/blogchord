import React, { useContext, useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/user")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUser(data.user);
          setAllBlogs(data.blogs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // setTimeout(() => {
        //   setUser({ image: "xyz", displayName: "A7" });
        //   setLoading(false);
        // }, 2000);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, allBlogs }}>
      {children}
    </AuthContext.Provider>
  );
}
