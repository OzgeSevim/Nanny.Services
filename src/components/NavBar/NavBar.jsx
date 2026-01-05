import React, { useContext, useState } from "react";
import css from "./NavBar.module.css";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { logoutUser } from "../../services/authService.js";
import { FaUser } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

export const NavBar = ({ variant = "home" }) => {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeModal = () => setOpenModal(null);
  return (
    <div className={`${css.navBarContainer} ${css[variant]}`}>
      <div className={css.navBarLogo}>Nanny.Services</div>
      <button
        className={css.hamburger}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
      {/* <div className={css.navBarList}>
        <ul className={`${css.navList} ${css[`${variant}NavList`]}`}>
          <li className={css.navListItem}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={css.navListItem}>
            <NavLink to="/nannies">Nannies</NavLink>
          </li>

          
          {user && (
            <li className={css.navListItem}>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          )}
        </ul>
      </div> */}

      <div className={`${css.navBarList} ${isMenuOpen ? css.menuOpen : ""}`}>
        <ul className={`${css.navList} ${css[`${variant}NavList`]}`}>
          <li className={css.navListItem}>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li className={css.navListItem}>
            <NavLink to="/nannies" onClick={() => setIsMenuOpen(false)}>
              Nannies
            </NavLink>
          </li>

          {user && (
            <li className={css.navListItem}>
              <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                Favorites
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobilde login / user burada */}
        <div className={css.mobileAuth}>
          {!user ? (
            <>
              <button
                className={css.loginBtn}
                onClick={() => {
                  setOpenModal("login");
                  setIsMenuOpen(false);
                }}
              >
                Log In
              </button>
              <button
                className={css.registerBtn}
                onClick={() => {
                  setOpenModal("register");
                  setIsMenuOpen(false);
                }}
              >
                Registration
              </button>
            </>
          ) : (
            <div className={css.mobileUserContainer}>
              <div className={css.mobileUserBox}>
                <span className={css.userIcon}>
                  <FaUser size={12} />
                </span>
                <span className={css.userName}>{user.email.split("@")[0]}</span>
              </div>
              <button className={css.logOutBtn} onClick={logoutUser}>
                Log out
              </button>
            </div>
          )}
        </div>
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
