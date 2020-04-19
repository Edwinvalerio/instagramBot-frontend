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
          <h1 id="account-username">
            {instagramUsername ? instagramUsername : null}
          </h1>

          {this.props.isBotOn ? (
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

          <img
            id="avatar-image"
            src="https://i.pravatar.cc/300"
            alt="profile"
          />
        </div>
      </div>
    );
  }
}
