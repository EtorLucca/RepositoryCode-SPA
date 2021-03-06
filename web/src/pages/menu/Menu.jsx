import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

function Menu() {
  return (
    <nav className="menu">
      <div className="menu__titulo">MENU</div>
      <div className="menu__nav">
        <NavLink to="/editor" className="menu__nav--div">
          <div className="menu__nav--iusers active__icon">
            <i className="fas fa-code "></i>
          </div>
          <div className="menu__nav--text">
            <span className="active">Editor de código</span>
          </div>
        </NavLink>
        <NavLink to="/comunidade" className="menu__nav--div">
          <div className="menu__nav--iusers active__icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="menu__nav--text">
            <span className="active">Comunidade</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default Menu;
