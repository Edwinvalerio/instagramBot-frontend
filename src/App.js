import React from "react";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import DashBoard from "./component/dashborad/DashBoard";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Homepage from "./component/homepage/HomePage";

import "./App.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/dashboard" component={DashBoard} />
          <Navbar />
        </Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
      </div>
    );
  }
}

export default App;

// <h1>
//             Welcome to IGBot
//             <span role="img" aria-label="sheep">
//               🤖
//             </span>
//           </h1>
