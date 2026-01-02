import { useContext, useEffect, useState } from "react";
import { getFavorites } from "../../services/favoritesService.js";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import css from "./FavoritesPage.module.css";
import { NavBar } from "../../components/NavBar/NavBar.jsx";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favoriteNannies, setFavoriteNannies] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      const favoritesData = await getFavorites(user.uid);

      if (!favoritesData) return;

      const favoriteIds = Object.keys(favoritesData);

      const nanniesRef = ref(db, "nannies");
      const snapshot = await get(nanniesRef);

      if (!snapshot.exists()) return;

      const nanniesData = snapshot.val();

      const filtered = Object.entries(nanniesData)
        .filter(([id]) => favoriteIds.includes(id))
        .map(([id, data]) => ({ id, ...data }));

      setFavoriteNannies(filtered);
    };

    loadFavorites();
  }, [user]);

  // if (!favoriteNannies.length) {
  //   return <p>Henüz favori bakıcı eklenmedi.</p>;
  // }

  return (
    <div className={css.favoriteContainer}>
      <NavBar variant="nannies" />
      <div className={css.nanniesList}>
        {favoriteNannies.map((nanny) => (
          <NannyCard key={nanny.id} nanny={nanny} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
