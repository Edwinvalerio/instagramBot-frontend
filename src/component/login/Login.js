import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// ADDRESS OF SERVER OR BACKEND
import { apiDomain } from "../../serverAddress";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWrongPassword: false,
      isLogInBtnDisabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isLogInBtnDisabled: true,
    });
    axios.post(`${apiDomain}/api/login`, { ...this.state }).then((res) => {
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("wrong password");
        this.setState({
          isWrongPassword: true,
          isLogInBtnDisabled: false,
        });
      }

      this.setState({
        isLogInBtnDisabled: false,
      });
    });
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }
  render() {
    return (
      <div id="login_screen">
        <img id="signin-logo" src="/login_image.png" alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input className="user-inputs" name="memberEmail" type="email" placeholder="youremail@gmail.com" required onChange={this.handleChange} />
          <input className="user-inputs" name="memberPassword" type="password" placeholder="password" required onChange={this.handleChange} />
          {this.state.isWrongPassword ? <p>Wrong username or password</p> : null}
          <button id="login-btn" disabled={this.state.isLogInBtnDisabled}>
            Sign in
          </button>
          <p>Don't have an account?</p>

          <NavLink to="/">Register now</NavLink>
          <NavLink id="terms" to="/terms">
            terms and Conditioms
          </NavLink>
        </form>
      </div>
    );
  }
}
