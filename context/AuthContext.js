import firebase_app from '@/lib/firebase/init';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import React from 'react';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{loading ? <div className="w-full h-screen flex items-center justify-center">Loading...</div> : children}</AuthContext.Provider>;
};
