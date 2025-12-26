// import React from "react";
// import css from "./NannyCard.module.css";

// const NannyCard = () => {
//   return <div>NannyCard</div>;
// };

// export default NannyCard;

import { useState } from "react";
import NannyDetails from "../NannyDetails/NannyDetails.jsx";
import css from "./NannyCard.module.css";

const NannyCard = ({ nanny }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { name, avatar_url, location, price_per_hour, rating } = nanny;

  return (
    <li className="nanny-card">
      {/* HEADER */}
      <div className="nanny-card__header">
        <img src={avatar_url} alt={name} className="nanny-card__avatar" />

        {/* FAVORITE (şimdilik sadece UI) */}
        <button
          type="button"
          className="nanny-card__favorite-btn"
          aria-label="Add to favorites"
        >
          ♥
        </button>
      </div>

      {/* BASIC INFO */}
      <div className="nanny-card__info">
        <h3 className="nanny-card__name">{name}</h3>
        <p className="nanny-card__location">{location}</p>

        <div className="nanny-card__meta">
          <span className="nanny-card__rating">⭐ {rating}</span>
          <span className="nanny-card__price">{price_per_hour}$/hour</span>
        </div>
      </div>

      {/* READ MORE */}
      <button
        type="button"
        className="nanny-card__read-more"
        onClick={() => setIsDetailsOpen((prev) => !prev)}
      >
        {isDetailsOpen ? "Hide details" : "Read more"}
      </button>

      {/* DETAILS */}
      {isDetailsOpen && <NannyDetails nanny={nanny} />}
    </li>
  );
};

export default NannyCard;
