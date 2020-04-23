import React, { Component } from "react";
import "./Header.css";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { instagramUsername } = this.props;
    return (
      <div className="container">
        <div id="header">
          <p id="account-username">{instagramUsername ? instagramUsername : null}</p>

          {this.props.isBotOn && this.props.isMemberShipAcctive? (
            <div id="bot-running-container">
              <i className="fas fa-robot"></i>
              <p>Bot is Running..</p>
            </div>
          ) : (
            <div id="bot-running-container">
              <i className="fas fa-power-off"></i>
              <p>Bot is off</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
