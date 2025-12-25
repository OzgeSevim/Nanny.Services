import React from "react";
import css from "./HomePage.module.css";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar variant="home" />
      <div className={css.homePageContainer}>
        <div className={css.homePageLeft}>
          <h1 className={css.homePageLeftTitle}>
            Make Life Easier for the Family:
          </h1>
          <p className={css.homePageLeftDesc}>
            Find Babysitters Online for All Occasions
          </p>
          <button
            className={css.homePageLeftBtn}
            onClick={() => navigate("/nannies")}
          >
            Get started
            <span className={css.homePageLeftBtnIcon}>
              <MdOutlineArrowOutward size={18} />
            </span>
          </button>
        </div>

        <div className={css.homePageRight}>
          <div className={css.box}>
            <div className={css.boxIcon}>
              <FaCheck />
            </div>
            <div className={css.boxDesc}>
              <p>Experienced nannies</p>
              <span>15,000</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
