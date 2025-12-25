import React, { useContext, useState } from "react";
import css from "./NavBar.module.css";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";
import { FaUser } from "react-icons/fa";

export const NavBar = ({ variant = "home" }) => {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(null);
  // null | "login" | "register"

  const closeModal = () => setOpenModal(null);
  return (
    <div className={`${css.navBarContainer} ${css[variant]}`}>
      <div className={css.navBarLogo}>Nanny.Services</div>
      <div className={css.navBarList}>
        <ul className={`${css.navList} ${css[`${variant}NavList`]}`}>
          <li className={css.navListItem}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={css.navListItem}>
            <NavLink to="/nannies">Nannies</NavLink>
          </li>

          {/* ✅ Login olmuşsa göster */}
          {user && (
            <li className={css.navListItem}>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className={css.loginRegister}>
        {!user ? (
          <>
            <button
              className={css.loginBtn}
              onClick={() => setOpenModal("login")}
            >
              Log In
            </button>
            <button
              className={css.registerBtn}
              onClick={() => setOpenModal("register")}
            >
              Registration
            </button>
          </>
        ) : (
          <div className={css.userContainer}>
            <div className={css.userBox}>
              <span className={css.userIcon}>
                <FaUser size={12} />
              </span>
              <span className={css.userName}> {user.email.split("@")[0]}</span>
            </div>
            <button className={css.logOutBtn} onClick={logoutUser}>
              Log out
            </button>
          </div>
        )}
      </div>
      {openModal === "login" && <Login onClose={closeModal} />}

      {openModal === "register" && <Register onClose={closeModal} />}
    </div>
  );
};
