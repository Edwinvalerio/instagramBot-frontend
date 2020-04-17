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
            {instagramUsername ? instagramUsername : "Add account"}
          </h1>
          <div id="bot-running-container">
            <i className="fas fa-cog fa-spin"></i>
            <p>Bot is Running..</p>
          </div>
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
