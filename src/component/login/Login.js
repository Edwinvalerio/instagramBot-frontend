import React, { Component } from "react";
import axios from "axios";

// ADDRESS OF SERVER OR BACKEND
import { apiDomain } from "../../serverAddress";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWrongPassword: false,
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
    axios.post(`${apiDomain}/api/login`, { ...this.state }).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("wrong password");
        this.setState({
          isWrongPassword: true,
        });
      }
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
        <form onSubmit={this.handleSubmit}>
          <input name="memberEmail" type="email" placeholder="Enter your email" required onChange={this.handleChange} />
          <input name="memberPassword" type="password" placeholder="Enter your password" required onChange={this.handleChange} />
          {this.state.isWrongPassword ? <p>Wrong username or password</p> : null}
          <button>Sigin in</button>
        </form>
      </div>
    );
  }
}
