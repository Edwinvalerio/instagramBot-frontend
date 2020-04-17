import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTaken: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === `memberEmail`) {
      axios
        .post(`http://localhost:5000/api/checkemail`, {
          [e.target.name]: e.target.value,
        })
        .then((res) => {
          if (res.data.emailTaken) {
            this.setState({
              emailTaken: true,
            });
          } else {
            this.setState({
              emailTaken: false,
            });
          }
        });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.emailTaken) {
      axios
        .post(`http://localhost:5000/api/createAccount`, { ...this.state })
        .then((res) => {
          if (res.data.success) {
            window.location.href = "/dashboard";
          }
        });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="memberEmail"
            required
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            onChange={this.handleChange}
          />
          {this.state.emailTaken ? (
            <p>Email is taken. Please try another email</p>
          ) : null}
          <input
            required
            name="memberPassword"
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <input
            name="rememberPassword"
            required
            type="password"
            placeholder="Confirm your password"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <p>
            <input type="checkbox" /> I agree to the Terms of Service and
            Privacy Policy
          </p>

          <button>Sign up</button>
          <p>
            Already have an account ?{" "}
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
          </p>
        </form>
      </div>
    );
  }
}
