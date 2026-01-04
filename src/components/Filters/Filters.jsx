import React from "react";
import css from "./Filters.module.css";

export const Filters = ({ value, onChange }) => {
  return (
    <div className={css.filtersWrapper}>
      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="all">Show all</option>
          <option value="az">A to Z</option>
          <option value="za">Z to A</option>
          <option value="popular">Popular</option>
          <option value="not_popular">Not popular</option>
          <option value="price_low">Less than 10$</option>
          <option value="price_high">Greater than 10$</option>
        </select>

        <span className={css.arrow}></span>
      </div>
    </div>
  );
};
