import React from "react";
import Cards from "../cards/Cards";
import Chart from "../chart/Chart";
import Header from "../header/Header";
import axios from "axios";
// import { GlobalData } from "../../context/GlobalData";
export class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stopBot = this.stopBot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    localStorage.clear();
    window.location.href = "/";
  }
  stopBot() {}
  handleSubmit(e) {
    e.preventDefault();
  }
  componentDidMount() {
    axios
      .post(`http://localhost:5000/api/verifytoken`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            data: res.data,
          });
        } else {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  }
  // static contextType = GlobalData;
  render() {
    console.log(this.state.data);
    if (this.state.data) {
      return (
        <div>
          <Header instagramUsername={this.state.data.instagramUsername} />
          <Chart />
          <div id="cards-parent-container">
            <Cards background="#5C4ED2" number={23800} title="Follow by Bot" />
            <Cards
              background="#49A1F8"
              number={11000}
              title="Follower gained"
            />
            <Cards background="#FE0B52" number={73000} title="Likes Given" />
            <Cards background="#FF8100" number={214} title="Comment Given" />
          </div>
          {this.state.data.settings.isBotOn ? (
            <button id="stop-btn" onClick={this.stopBot}>
              STOP BOT
            </button>
          ) : (
            <button id="start-btn" onClick={this.stopBot}>
              START BOT
            </button>
          )}

          <form onSubmit={this.handleSubmit}>
            <h1>Settings</h1>
            <label>Your Deily Follow Limit</label>
            <input
              type="number"
              max="700"
              name="maxDeilyLikes"
              placeholder="maxDeilyLikes"
            />
            <input
              type="number"
              max="700"
              name="maxDeilyComment"
              placeholder="maxDeilyComment"
            />
            <input
              type="number"
              max="700"
              name="maxDeilyFollow"
              placeholder="maxDeilyFollow"
            />

            <button id="update-btn">UPDATE</button>
          </form>
          <button onClick={this.handleSignOut}>log out</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>loading</h1>
        </div>
      );
    }
  }
}

export default DashBoard;
