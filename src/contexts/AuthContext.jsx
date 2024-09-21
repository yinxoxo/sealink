import { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const fetchDisplayNameFromFirestore = async (uid) => {
    const db = getFirestore();
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data().displayName;
    } else {
      console.error("No such document in Firestore!");
      return null;
    }
  };

  const login = async (userInfo) => {
    if (!userInfo.displayName) {
      console.log("Display name missing, fetching from Firestore");
      const displayName = await fetchDisplayNameFromFirestore(userInfo.uid);
      userInfo = {
        ...userInfo,
        displayName: displayName,
      };
    }
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    console.log("User info set in localStorage and state:", userInfo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User info removed from state and localStorage");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
