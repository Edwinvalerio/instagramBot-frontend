import React from "react";
import Cards from "../cards/Cards";
// import Chart from "../chart/Chart";
import Header from "../header/Header";
import "./DashBoard.css";
import axios from "axios";

// ADDRESS OF SERVER OR BACKEND
import { apiDomain } from "../../serverAddress";

// import { GlobalData } from "../../context/GlobalData";
export class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteHashTag = this.deleteHashTag.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    // this.stopBot = this.stopBot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // HANDLE INSTAGRAM ACCOUNT
    this.handleInstagramAccount = this.handleInstagramAccount.bind(this);

    // MAX DEILY LIKES, COMMENTS AND FOLLOW
    this.handleMaxDaily = this.handleMaxDaily.bind(this);

    // INSERT COMMENT AND HASHTAG
    this.insertComment = this.insertComment.bind(this);
    this.insertHashTags = this.insertHashTags.bind(this);

    // USE DEFAULT COMMENTS TUGGLE
    this.handleTagPeopleWhoCommented = this.handleTagPeopleWhoCommented.bind(this);

    // TO ACTIVATE BOT
    this.handleStartBot = this.handleStartBot.bind(this);
    // TOGLE TO ACTIVATE LIKES, COMMENT, FOLLOW
    this.handleLikePost = this.handleLikePost.bind(this);
    this.handleCommentPost = this.handleCommentPost.bind(this);
    this.handleFollowAccount = this.handleFollowAccount.bind(this);
  }
  handleInstagramAccount(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  handleSignOut() {
    localStorage.clear();
    window.location.href = "/";
  }

  handleTagPeopleWhoCommented(e) {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: !this.state.data.tagPeopleThatCommented,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${apiDomain}/api/updateSettings`, {
        ...this.state.data,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        }
      });
  }
  componentDidMount() {
    axios
      .post(`${apiDomain}/api/verifytoken`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res.data);
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
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleMaxDaily(e) {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          [e.target.name]: e.target.value,
        },
      },
    });
  }

  handleFollowAccount(e) {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          followAccount: !this.state.data.settings.followAccount,
        },
      },
    });
    console.log(this.state.data.settings.followAccount);
  }

  handleCommentPost() {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          commentPost: !this.state.data.settings.commentPost,
        },
      },
    });
  }
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
  }
  handleStartBot() {
    this.setState({
      data: {
        ...this.state.data,
        settings: { ...this.state.data.settings, isBotOn: !this.state.data.settings.isBotOn },
      },
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
    console.log(this.state.data.settings);
  }

  // INSERT HASHTAGS TO THE LIST AFTER HANDLECHANGE IS COMPLETED
  insertHashTags() {
    const spaceRegex = /\s/g;
    this.setState({
      data: {
        ...this.state.data,
        hashTags: [...this.state.data.hashTags, this.state.hashTag.replace(spaceRegex, "")],
      },
    });
  }

  // INSERT COMMENT TO THE LIST AFTER HANDLECHANGE IS COMPLETED
  insertComment() {
    console.log(this.state.comment);
    this.setState({
      data: {
        ...this.state.data,
        comments: [...this.state.data.comments, this.state.comment],
      },
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
    // IF THERES NO TOKEN RE-DIRECT TO HOMEPAGE
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    if (this.state.data) {
      return (
        <div>
          <Header instagramUsername={this.state.data.instagramUsername || `add your ig account`} isBotOn={this.state.data.settings.isBotOn} />
          {/* <Chart /> */}

          <div id="cards-parent-container">
            <Cards background="#5C4ED2" number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.followed === true).length} title="Bot has followed" />
            {/* <Cards
              background="#49A1F8"
              number={"bnal"}
              title="Follower gained"
            /> */}
            <Cards background="#FE0B52" number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.liked === true).length} title="Likes Given" />
            <Cards background="#FF8100" number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.commented === true).length} title="Comment Given" />
            <Cards
              background="#4287f5"
              number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.followed === true && e.date === new Date().toLocaleDateString()).length}
              title="Today follow"
            />
            <Cards
              background="#52288a"
              number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.liked === true && e.date === new Date().toLocaleDateString()).length}
              title="Today liked"
            />
            <Cards
              background="#303d6e"
              number={this.state.data.activities.accountsFollowedByBot.filter((e) => e.commented === true && e.date === new Date().toLocaleDateString()).length}
              title="Today Commented"
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
            <input name="instagramUsername" type="text" placeholder="instagram username" onChange={this.handleInstagramAccount} value={this.state.data.instagramUsername} />
            <input name="instagramPassword" type="text" placeholder="instagram Password" onChange={this.handleInstagramAccount} value={this.state.data.instagramPassword} />
            <label>maxDeilyLikes</label>
            <input value={this.state.data.settings.maxDeilyLikes} type="number" max="30" name="maxDeilyLikes" placeholder="maxDeilyLikes" onChange={this.handleMaxDaily} />
            <label>maxDeilyComment</label>
            <input
              // defaultValue={this.state.data.settings.maxDeilyComment}
              value={this.state.data.settings.maxDeilyComment}
              type="number"
              max="30"
              name="maxDeilyComment"
              placeholder="maxDeilyComment"
              onChange={this.handleMaxDaily}
            />
            <label>maxDeilyFollow</label>
            <input value={this.state.data.settings.maxDeilyFollow} type="number" max="30" name="maxDeilyFollow" placeholder="maxDeilyFollow" onChange={this.handleMaxDaily} />
            <label>likePost</label>
            <input checked={this.state.data.settings.likePost} type="checkbox" name="likePost" placeholder="likePost" onChange={this.handleLikePost} />
            <label>commentPost</label>
            <input checked={this.state.data.settings.commentPost} type="checkbox" name="commentPost" placeholder="commentPost" onChange={this.handleCommentPost} />
            <label>followAccount</label>
            <input checked={this.state.data.settings.followAccount} type="checkbox" name="followAccount" placeholder="followAccount" onChange={this.handleFollowAccount} />

            {/* HASHTAGS */}
            <div>
              <h2>hashTags</h2>
              <div className="hashtags-comment-container">
                {this.state.data.hashTags.map((item, index) => (
                  <div key={index}>
                    {item}
                    <i onClick={() => this.deleteHashTag(index)} className="fas fa-trash"></i>
                  </div>
                ))}
              </div>
              <div>Add</div>
              <input name="hashTag" onChange={this.handleChange} placeholder="add hashtags" />
            </div>
            <i onClick={this.insertHashTags} className="fas fa-plus-circle"></i>
            {/* HASHTAGS */}

            {/* Comments */}
            <div>
              <h2>Comments</h2>
              <p>The bot will pick a random comment from the list</p>

              <div className="hashtags-comment-container">
                {this.state.data.comments.map((item, index) => (
                  <div key={index}>
                    {item}
                    <i onClick={() => this.deleteComment(index)} className="fas fa-trash"></i>
                  </div>
                ))}
              </div>
              <div>
                <p>Tag 5 people from the comments</p>
                <input checked={this.state.data.tagPeopleThatCommented} type="checkbox" name="tagPeopleThatCommented" onChange={this.handleTagPeopleWhoCommented} />
              </div>
              <input name="comment" placeholder="add comments" onChange={this.handleChange} />
              <i onClick={this.insertComment} className="fas fa-plus-circle"></i>
            </div>
            {/* Comments */}

            <button id="update-btn">APPLY CHANGES</button>
          </form>
          <button onClick={this.handleSignOut}>log out</button>
        </div>
      );
    } else {
      return (
        <div id="loading-dashboard">
          <i class="fas fa-spinner fa-pulse"></i>
          <p>Loading..</p>
        </div>
      );
    }
  }
}

export default DashBoard;
