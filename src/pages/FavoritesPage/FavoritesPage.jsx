import { useContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import css from "./FavoritesPage.module.css";

const Favorites = () => {
  const { user, favorites } = useContext(AuthContext);
  const [favoriteNannies, setFavoriteNannies] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      const favoriteIds = Object.keys(favorites);
      if (favoriteIds.length === 0) {
        setFavoriteNannies([]);
        return;
      }

      const snapshot = await get(ref(db, "nannies"));
      if (!snapshot.exists()) return;

      const nanniesData = snapshot.val();

      const filtered = Object.entries(nanniesData)
        .filter(([id]) => favoriteIds.includes(id))
        .map(([id, data]) => ({ id, ...data }));

      setFavoriteNannies(filtered);
    };

    loadFavorites();
  }, [user, favorites]); // favorites değişirse listeyi yeniden yükle

  return (
    <div className={css.favoriteContainer}>
      <div className={css.navBar}>
        <NavBar variant="nannies" />
      </div>
      <div className={css.nanniesList}>
        {favoriteNannies.length === 0 ? (
          <p>Henüz favori bakıcı eklenmedi.</p>
        ) : (
          favoriteNannies.map((nanny) => (
            <NannyCard key={nanny.id} nanny={nanny} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
