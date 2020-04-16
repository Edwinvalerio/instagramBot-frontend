import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.table(this.state);
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, { ...this.state })
      .then((res) => {
        console.log(res.data);
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="memberEmail"
            type="email"
            placeholder="Enter your email"
            required
            onChange={this.handleChange}
          />
          <input
            name="memberPassword"
            type="password"
            placeholder="Enter your password"
            required
            onChange={this.handleChange}
          />

          <button>Sigin in</button>
        </form>
      </div>
    );
  }
}
