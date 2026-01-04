import { useContext, useState } from "react";
import NannyDetails from "../NannyDetails/NannyDetails.jsx";
import css from "./NannyCard.module.css";
import { CiLocationOn } from "react-icons/ci";
import { FaStar, FaRegHeart } from "react-icons/fa";
import {
  addFavorite,
  removeFavorite,
} from "../../services/favoritesService.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const NannyCard = ({ nanny }) => {
  const { user, favorites, setFavorites } = useContext(AuthContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isFavorite = !!favorites[nanny.id];

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("Favorilere eklemek için giriş yapmalısınız");
      return;
    }

    let updatedFavorites = { ...favorites };

    if (isFavorite) {
      await removeFavorite(user.uid, nanny.id);
      delete updatedFavorites[nanny.id];
    } else {
      await addFavorite(user.uid, nanny.id);
      updatedFavorites[nanny.id] = true;
    }

    setFavorites(updatedFavorites);
  };

  const {
    name,
    about,
    avatar_url,
    location,
    price_per_hour,
    rating,
    birthday,
    experience,
    kids_age,
    characters,
    education,
  } = nanny;

  const age = new Date().getFullYear() - new Date(birthday).getFullYear();

  return (
    <div className={css.nannyCardContainer}>
      <div className={css.nannyImage}>
        <img src={avatar_url} alt={name} width={96} />
      </div>
      <div className={css.nannyInfo}>
        <div className={css.nannyTitle}>
          <div className={css.nannyName}>
            <p>Nanny</p>
            <h2>{name}</h2>
          </div>
          <div className={css.nannyTitleInfo}>
            <div className={css.nannyTitleInfoItem}>
              <CiLocationOn />
              <span>{location}</span>
            </div>
            <div className={css.nannyTitleInfoItem}>
              <FaStar fill="#FFC531" />
              <span>{rating}</span>
            </div>
            <div className={css.nannyTitleInfoItem}>
              <p>
                Price / 1 hour:{" "}
                <span className={css.price}>{price_per_hour}$</span>
              </p>
            </div>
            <div className={css.nannyFavoriteBtn}>
              <button onClick={handleFavoriteClick} className={css.heartBtn}>
                <FaRegHeart
                  size={26}
                  color={isFavorite ? "#e44848" : "#101828"}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={css.nannyAttributes}>
          <div className={css.nannyAttributesItem}>
            <p>
              Age: <span>{age}</span>
            </p>
          </div>
          <div className={css.nannyAttributesItem}>
            <p>
              Experience: <span>{experience}</span>
            </p>
          </div>
          <div className={css.nannyAttributesItem}>
            <p>
              Kids Age: <span>{kids_age}</span>
            </p>
          </div>
          <div className={css.nannyAttributesItem}>
            <p>
              Characters:{" "}
              <span>
                {characters
                  .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
                  .join(", ")}
              </span>
            </p>
          </div>
          <div className={css.nannyAttributesItem}>
            <p>
              Education: <span>{education}</span>
            </p>
          </div>
        </div>

        <div className={css.nannyAbout}>
          <p>{about}</p>
        </div>

        {!isDetailsOpen && (
          <button
            type="button"
            className={css.readMore}
            onClick={() => setIsDetailsOpen(true)}
          >
            Read more
          </button>
        )}

        {isDetailsOpen && <NannyDetails nanny={nanny} />}
      </div>
    </div>
  );
};

export default NannyCard;
