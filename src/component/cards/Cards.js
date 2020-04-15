import React, { Component } from "react";
import CountUp from "react-countup";
import "./Cards.css";
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { background, number, title } = this.props;
    return (
      <div>
        <div className="cards" style={{ backgroundColor: background }}>
          <p>{title}</p>
          <h1>
            <CountUp end={number} duration={7} decimal="," />
          </h1>
        </div>
      </div>
    );
  }
}
