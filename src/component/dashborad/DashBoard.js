import React from "react";
import Cards from "../cards/Cards";
import Chart from "../chart/Chart";
import Header from "../header/Header";
import "./DashBoard.css";
import axios from "axios";
import { RadialBarChart } from "recharts";
// import { GlobalData } from "../../context/GlobalData";
export class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteHashTag = this.deleteHashTag.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.stopBot = this.stopBot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartBot = this.handleStartBot.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
  }
  handleSignOut() {
    localStorage.clear();
    window.location.href = "/";
  }
  stopBot() {}
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/updateSettings`, { ...this.state.data })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        }
      });
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
  handleChange(e) {}
  handleLikePost(e) {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          likePost: !this.state.data.settings.likePost,
        },
      },
    });
    console.log(this.state.data.settings.likePost);
  }
  handleStartBot(e) {
    this.setState({
      data: {
        ...this.state.data,
        settings: { isBotOn: !this.state.data.settings.isBotOn },
      },
    });
    axios
      .post(`http://localhost:5000/api/updateSettings`, { ...this.state.data })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        }
      });
    console.log(this.state.data.settings.isBotOn);
  }

  deleteComment(index) {
    const filtered = this.state.data.comments.filter((item) => {
      return item !== this.state.data.comments[index];
    });
    this.setState({
      data: { ...this.state.data, comments: [...filtered] },
    });
  }
  deleteHashTag(index) {
    const filtered = this.state.data.hashTags.filter((item) => {
      return item !== this.state.data.hashTags[index];
    });
    this.setState({
      data: { ...this.state.data, hashTags: [...filtered] },
    });
  }
  // static contextType = GlobalData;
  render() {
    if (this.state.data) {
      return (
        <div>
          <Header
            instagramUsername={this.state.data.instagramUsername}
            isBotOn={this.state.data.settings.isBotOn}
          />
          <Chart />
          <div id="cards-parent-container">
            <Cards
              background="#5C4ED2"
              number={this.state.data.activities.followByBot}
              title="Bot has followed"
            />
            {/* <Cards
              background="#49A1F8"
              number={"bnal"}
              title="Follower gained"
            /> */}
            <Cards
              background="#FE0B52"
              number={this.state.data.activities.likesGiven}
              title="Likes Given"
            />
            <Cards
              background="#FF8100"
              number={this.state.data.activities.commentGiven}
              title="Comment Given"
            />
          </div>
          {this.state.data.settings.isBotOn ? (
            <button id="stop-btn" onClick={this.handleStartBot}>
              STOP BOT
            </button>
          ) : (
            <button id="start-btn" onClick={this.handleStartBot}>
              START BOT
            </button>
          )}

          <form onSubmit={this.handleSubmit}>
            <h1>Settings</h1>
            <label>maxDeilyLikes</label>
            <input
              value={this.state.data.settings.maxDeilyLikes}
              type="number"
              max="700"
              name="maxDeilyLikes"
              placeholder="maxDeilyLikes"
              onChange={this.handleChange}
            />
            <label>maxDeilyComment</label>
            <input
              value={this.state.data.settings.maxDeilyComment}
              type="number"
              max="700"
              name="maxDeilyComment"
              placeholder="maxDeilyComment"
            />
            <label>maxDeilyFollow</label>
            <input
              value={this.state.data.settings.maxDeilyFollow}
              type="number"
              max="700"
              name="maxDeilyFollow"
              placeholder="maxDeilyFollow"
            />
            <label>likePost</label>
            <input
              checked={this.state.data.settings.likePost}
              type="checkbox"
              name="likePost"
              placeholder="likePost"
              onChange={this.handleLikePost}
            />
            <label>commentPost</label>
            <input
              checked={this.state.data.settings.commentPost}
              type="checkbox"
              name="commentPost"
              placeholder="commentPost"
            />
            <label>followAccount</label>
            <input
              checked={this.state.data.settings.followAccount}
              type="checkbox"
              name="followAccount"
              placeholder="followAccount"
            />

            {/* HASHTAGS */}
            <div>
              <h2>hashTags</h2>
              <div className="hashtags-comment-container">
                {this.state.data.hashTags.map((item, index) => (
                  <div>
                    {item}
                    <i
                      onClick={() => this.deleteHashTag(index)}
                      class="fas fa-trash"
                    ></i>
                  </div>
                ))}
              </div>
              <input placeholder="add hashtags" />
            </div>
            {/* HASHTAGS */}

            {/* Comments */}
            <div>
              <h2>Comments</h2>
              <p>The bot will pick a random comment from the list</p>
              <div className="hashtags-comment-container">
                {this.state.data.comments.map((item, index) => (
                  <div>
                    {item}
                    <i
                      onClick={() => this.deleteComment(index)}
                      class="fas fa-trash"
                    ></i>
                  </div>
                ))}
              </div>
              <input placeholder="add comments" />
            </div>
            {/* Comments */}

            <button id="update-btn">APPLY CHANGES</button>
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
