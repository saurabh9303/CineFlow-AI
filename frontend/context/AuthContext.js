"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const fetchProfile = async () => {
      try {
         const res = await fetch(
            `http://localhost:8000/api/user/profile`,
            {
               credentials: "include",
            }
         );

         const data = await res.json();

         if (data.success) {
            setUser(data.user);
         } else {
            setUser(null);
         }
      } catch (error) {
         console.log(error);
         setUser(null);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchProfile();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            setUser,
            loading,
            fetchProfile,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export const useAuth = () => useContext(AuthContext);