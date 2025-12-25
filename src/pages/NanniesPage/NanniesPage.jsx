import React from "react";
import css from "./NanniesPage.module.css";
import { NavBar } from "../../components/NavBar/NavBar.jsx";

const NanniesPage = () => {
  return (
    <div className={css.pageContainer}>
      <div className={css.navBar}>
        <NavBar variant="nannies" />
      </div>
    </div>
  );
};

export default NanniesPage;
