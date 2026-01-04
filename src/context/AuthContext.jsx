// import { createContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../services/firebase.js";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // 🔥 Firebase user
//       setLoading(false);
//     });

//     return () => unsub();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase.js";
import { ref, get } from "firebase/database";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({}); // tüm favoriler burada
  const [loading, setLoading] = useState(true);

  // Firebase auth değişikliklerini takip et
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Kullanıcının favorilerini Firebase'den çek
        const favRef = ref(db, `favorites/${currentUser.uid}`);
        const snapshot = await get(favRef);
        setFavorites(snapshot.exists() ? snapshot.val() : {});
      } else {
        setFavorites({});
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, favorites, setFavorites }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
