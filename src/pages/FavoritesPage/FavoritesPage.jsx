import { useContext, useEffect, useState } from "react";
import { getFavorites } from "../../services/favoritesService.js";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favoriteNannies, setFavoriteNannies] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      // 1️⃣ Favori ID'leri al
      const favoritesData = await getFavorites(user.uid);

      if (!favoritesData) return;

      const favoriteIds = Object.keys(favoritesData);

      // 2️⃣ Tüm nannies listesini al
      const nanniesRef = ref(db, "nannies");
      const snapshot = await get(nanniesRef);

      if (!snapshot.exists()) return;

      const nanniesData = snapshot.val();

      // 3️⃣ Favori olanları filtrele
      const filtered = Object.entries(nanniesData)
        .filter(([id]) => favoriteIds.includes(id))
        .map(([id, data]) => ({ id, ...data }));

      setFavoriteNannies(filtered);
    };

    loadFavorites();
  }, [user]);

  if (!favoriteNannies.length) {
    return <p>Henüz favori bakıcı eklenmedi.</p>;
  }

  return (
    <div className="nannies-list">
      {favoriteNannies.map((nanny) => (
        <NannyCard key={nanny.id} nanny={nanny} />
      ))}
    </div>
  );
};

export default Favorites;
