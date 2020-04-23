import React, { Component } from "react";
import axios from "axios";

// ADDRESS OF SERVER OR BACKEND
import { apiDomain } from "../../serverAddress";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWrongPassword: false,
      isLogInBtnDisabled: false
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
      isLogInBtnDisabled: true
    })
    axios.post(`${apiDomain}/api/login`, { ...this.state }).then((res) => {

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("wrong password");
        this.setState({
          isWrongPassword: true,
          isLogInBtnDisabled: false
        });
      }



      this.setState({
        isLogInBtnDisabled: false
      })
    });

  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }
  render() {
    return (
      <div>
        <h1> Welcome back!</h1>
        <p>Use your credentials to Sign In</p>
        <form onSubmit={this.handleSubmit}>
          <input name="memberEmail" type="email" placeholder="Enter your email" required onChange={this.handleChange} />
          <input name="memberPassword" type="password" placeholder="Enter your password" required onChange={this.handleChange} />
          {this.state.isWrongPassword ? <p>Wrong username or password</p> : null}
          <button disabled={this.state.isLogInBtnDisabled}>Sigin in</button>
        </form>
      </div>
    );
  }
}
