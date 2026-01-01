import { useState } from "react";
import NannyDetails from "../NannyDetails/NannyDetails.jsx";
import css from "./NannyCard.module.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiStar } from "react-icons/ci";

const NannyCard = ({ nanny }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { name, avatar_url, location, price_per_hour, rating } = nanny;

  const age = new Date().getFullYear() - new Date(nanny.birthday).getFullYear();
  return (
    // <li className="nanny-card">
    //   {/* HEADER */}
    //   <div className="nanny-card__header">
    //     <img src={avatar_url} alt={name} className="nanny-card__avatar" />

    //     {/* FAVORITE (şimdilik sadece UI) */}
    //     <button
    //       type="button"
    //       className="nanny-card__favorite-btn"
    //       aria-label="Add to favorites"
    //     >
    //       ♥
    //     </button>
    //   </div>

    //   {/* BASIC INFO */}
    //   <div className="nanny-card__info">
    //     <h3 className="nanny-card__name">{name}</h3>
    //     <p className="nanny-card__location">{location}</p>

    //     <div className="nanny-card__meta">
    //       <span className="nanny-card__rating">⭐ {rating}</span>
    //       <span className="nanny-card__price">{price_per_hour}$/hour</span>
    //     </div>
    //   </div>

    //   {/* READ MORE */}
    //   <button
    //     type="button"
    //     className="nanny-card__read-more"
    //     onClick={() => setIsDetailsOpen((prev) => !prev)}
    //   >
    //     {isDetailsOpen ? "Hide details" : "Read more"}
    //   </button>

    //   {/* DETAILS */}
    //   {isDetailsOpen && <NannyDetails nanny={nanny} />}
    // </li>
    <div className={css.nannyCardContainer}>
      <div className={css.nannyImg}>
        <img src={avatar_url} alt={name} width={100} />
      </div>
      <div className={css.nannyProfile}>
        <div className={css.nannyTitle}>
          <div className={css.nannyTitleName}>
            <p className={css.nannyTitle}>Nanny</p>
            <h2 className={css.nannyName}>{name}</h2>
          </div>
          <div className={css.nannyTitleInfo}>
            <div className={css.nannyTitleInfoItem}>
              <MdOutlineLocationOn />
              <span>{location}</span>
            </div>
            <div className={css.nannyTitleInfoItem}>
              <CiStar />
              <span>{rating}</span>
            </div>
            <div className={css.nannyTitleInfoItem}>
              <p>
                Price / 1 hour: <span>{price_per_hour}$</span>
              </p>
            </div>
            <div className={css.nannyTitleInfoItem}> </div>
          </div>
        </div>
        <div className={css.nannyInfo}>
          <div className={css.nannyInfoItem}>
            <p>
              Age: <span>{age}</span>
            </p>
          </div>
          <div className={css.nannyInfoItem}>
            <p>
              Experience: <span>{nanny.experience}</span>
            </p>
          </div>
          <div className={css.nannyInfoItem}>
            <p>
              Kids Age: <span>{nanny.kids_age}</span>
            </p>
          </div>
          <div className={css.nannyInfoItem}>
            <p>
              Characters:{" "}
              <span>
                {nanny.characters
                  .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                  .join(", ")}
              </span>
            </p>
          </div>
          <div className={css.nannyInfoItem}>
            <p>
              Education: <span>{nanny.education}</span>
            </p>
          </div>
        </div>
        <div className={css.nannyAbout}>
          <p className={css.about}>{nanny.about}</p>
        </div>
      </div>
    </div>
  );
};

export default NannyCard;
