import React from "react";
import Header from "./component/header/Header";
import Chart from "./component/chart/Chart";
import Cards from "./component/cards/Cards";

import "./App.css";

export class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stopBot = this.stopBot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  stopBot() {}
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <Header />
        <Chart />
        <div id="cards-parent-container">
          <Cards background="#5C4ED2" number={23800} title="Follower" />
          <Cards background="#49A1F8" number={11000} title="Following" />
          <Cards background="#FE0B52" number={73000} title="Likes Given" />
          <Cards background="#FF8100" number={214} title="Comment Given" />
        </div>
        <button id="stop-btn" onClick={this.stopBot}>
          STOP BOT
        </button>
        {/* <button id="start-btn" onClick={this.stopBot}>
          START BOT
        </button> */}
        <form onSubmit={this.handleSubmit}>
          <h1>Settings</h1>
          <label>Your Deily Follow Limit</label>
          <input type="number" max="700" placeholder="Daily follow limit" />
          <button id="update-btn">UPDATE</button>
        </form>
      </div>
    );
  }
}

export default DashBoard;
