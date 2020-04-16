import React from "react";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import { NavLink, Switch, Route } from "react-router-dom";

import "./App.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <NavLink to="/">Home</NavLink>

          <div>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
            <NavLink className="nav-link" to="/Signup">
              Sign up
            </NavLink>
          </div>
        </header>
        <h1>hell from app</h1>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
