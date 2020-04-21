import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
export default class Navbar extends Component {
  render() {
    return (
      <header>
        <NavLink to="/">
          <span id="logo" role="img" aria-label="sheep">
            🤖
          </span>
        </NavLink>
        <div>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <NavLink activeClassName="active-navbar" className="nav-link sigin-btn" to="/login">
            Log In
          </NavLink>
          <NavLink activeClassName="active-navbar" className="nav-link sigup-btn" to="/Signup">
            Sign up
          </NavLink>
        </div>
      </header>
    );
  }
}
