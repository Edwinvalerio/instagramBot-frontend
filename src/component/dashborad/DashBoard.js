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
    this.deleteAccountUser = this.deleteAccountUser.bind(this);
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

    // INSERT COMMENT & HASHTAG & ACCOUNTS
    this.insertComment = this.insertComment.bind(this);
    this.insertHashTags = this.insertHashTags.bind(this);
    this.inserAccounts = this.inserAccounts.bind(this);

    // USE DEFAULT COMMENTS TUGGLE
    this.handleTagPeopleWhoCommented = this.handleTagPeopleWhoCommented.bind(this);

    // TUGGLE GET FOLLOWERS BY ACCCOUNT OR  HASHTAGS
    this.tagle_by_username = this.tagle_by_username.bind(this);
    this.tagle_by_hashtags = this.tagle_by_hashtags.bind(this);

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

  tagle_by_username() {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          followByUserName: true,
          followByHashTags: false,
        },
      },
    });
  }

  tagle_by_hashtags() {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          followByUserName: false,
          followByHashTags: true,
        },
      },
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
  inserAccounts() {
    const spaceRegex = /\s/g;
    if (this.state.account) {
      this.setState({
        data: {
          ...this.state.data,
          userThatInteractWith: [...this.state.data.userThatInteractWith, this.state.account.replace(spaceRegex, "")],
        },
      });
    }
  }
  // INSERT HASHTAGS TO THE LIST AFTER HANDLECHANGE IS COMPLETED
  insertHashTags() {
    const spaceRegex = /\s/g;
    if (this.state.hashTag) {
      this.setState({
        data: {
          ...this.state.data,
          hashTags: [...this.state.data.hashTags, this.state.hashTag.replace(spaceRegex, "")],
        },
      });
    }
  }

  // INSERT COMMENT TO THE LIST AFTER HANDLECHANGE IS COMPLETED
  insertComment() {
    if (this.state.comment) {
      this.setState({
        data: {
          ...this.state.data,
          comments: [...this.state.data.comments, this.state.comment],
        },
      });
    }
  }

  deleteAccountUser(index) {
    const userThatInteractWith = this.state.data.userThatInteractWith.filter((item) => {
      return item !== this.state.data.userThatInteractWith[index];
    });
    this.setState({
      data: { ...this.state.data, userThatInteractWith: [...userThatInteractWith] },
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
      console.log(this.state.data.settings);

      return (
        <div>
          <Header instagramUsername={this.state.data.instagramUsername || `add your ig account`} isBotOn={this.state.data.settings.isBotOn} isMemberShipAcctive={this.state.data.isMemberShipAcctive} />
          {!this.state.data.isMemberShipAcctive ? (
            <div id="membership-msg">
              <h1>Membership not active</h1>
              <p>Please contact developer to activate your membership</p>
            </div>
          ) : null}

          {/* <Chart data={this.state.data.activities.accountsFollowedByBot}/> */}

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
            <input className="add-input" name="instagramUsername" type="text" placeholder="instagram username" onChange={this.handleInstagramAccount} value={this.state.data.instagramUsername} />
            <input className="add-input" name="instagramPassword" type="text" placeholder="instagram Password" onChange={this.handleInstagramAccount} value={this.state.data.instagramPassword} />

            <label>
              Maximum Daily Likes <i class="fas fa-heart"></i>
            </label>
            <input className="add-input" value={this.state.data.settings.maxDeilyLikes} type="number" max="100" name="maxDeilyLikes" placeholder="maxDeilyLikes" onChange={this.handleMaxDaily} />
            <label>
              Maximum Daily Comment <i class="fas fa-comment"></i>
            </label>
            <input className="add-input" value={this.state.data.settings.maxDeilyComment} type="number" max="100" name="maxDeilyComment" placeholder="maxDeilyComment" onChange={this.handleMaxDaily} />
            <label>
              Maximum Daily Follow <i class="fas fa-user-plus"></i>
            </label>
            <input className="add-input" value={this.state.data.settings.maxDeilyFollow} type="number" max="100" name="maxDeilyFollow" placeholder="maxDeilyFollow" onChange={this.handleMaxDaily} />

            {/* TARGET ACCOUNTS */}

            <div id="toggle-container">
              <div className="check-box-contaner">
                <label>
                  Like Posts <i class="fas fa-heart"></i>
                </label>

                <input checked={this.state.data.settings.likePost} type="checkbox" name="likePost" placeholder="likePost" onChange={this.handleLikePost} />
              </div>
              <div className="check-box-contaner">
                <label>
                  Comment Posts <i class="fas fa-comment"></i>
                </label>

                <input checked={this.state.data.settings.commentPost} type="checkbox" name="commentPost" placeholder="commentPost" onChange={this.handleCommentPost} />
              </div>
              <div className="check-box-contaner">
                <label>
                  Follow Accounts <i class="fas fa-user-plus"></i>
                </label>
                <input checked={this.state.data.settings.followAccount} type="checkbox" name="followAccount" placeholder="followAccount" onChange={this.handleFollowAccount} />
              </div>

              {/* FIXME: DELETE THIS AFTER FOLLOW BY USER IS FIXED */}
              <div className="check-box-contaner">
                <label>
                  Follow Accounts that interact with users entered bellow <i class="fas fa-users"></i>
                </label>
                <input checked={this.state.data.settings.followByUserName} type="checkbox" name="user_or_hashTag" onChange={this.tagle_by_username} />
              </div>
              {/* FIXME: DELETE THIS AFTER FOLLOW BY USER IS FIXED */}

              <div className="check-box-contaner">
                <label>
                  Follow user by hashtagts <i class="fas fa-hashtag"></i>
                </label>
                <input checked={this.state.data.settings.followByHashTags} type="checkbox" name="user_or_hashTag" onChange={this.tagle_by_hashtags} />
              </div>
            </div>

            {/* FIXME: DELETE THIS AFTER FOLLOW BY USER IS FIXED */}
            {/* TARGET ACCOUNTS */}
            <div className="hashtags-comment-container">
              <h2>Users</h2>
              <p className="notes">
                The bot will Like, Follow & Comment accounts that interact with users in this list. if your want to gain more followers make sure the users is <strong>NOT</strong> Verified{" "}
                <i class="fas fa-certificate"></i>. and also make sure the user has a very active account
              </p>
              {this.state.data.userThatInteractWith.map((item, index) => (
                <div data-aos="fade-up" className="mini-cards" key={index}>
                  @{item}
                  <i onClick={() => this.deleteAccountUser(index)} className="fas fa-trash"></i>
                </div>
              ))}

              <input className="add-input" name="account" onChange={this.handleChange} placeholder="Add User" />
              <button type="button" onClick={this.inserAccounts}>
                ADD
              </button>
            </div>

            {/* FIXME: DELETE THIS AFTER FOLLOW BY USER IS FIXED */}

            {/* HASHTAGS */}
            <div className="hashtags-comment-container">
              <h2>hashTags</h2>
              <p className="notes">Using this option the but will look for users that had used theses hashTag in the past.</p>
              {this.state.data.hashTags.map((item, index) => (
                <div data-aos="fade-up" className="mini-cards" key={index}>
                  #{item}
                  <i onClick={() => this.deleteHashTag(index)} className="fas fa-trash"></i>
                </div>
              ))}
              <input className="add-input" name="hashTag" onChange={this.handleChange} placeholder="Add Hashtags" />
              <button type="button" onClick={this.insertHashTags}>
                ADD
              </button>
            </div>
            {/* HASHTAGS */}

            {/* Comments */}

            <div className="hashtags-comment-container">
              <h2>Comments</h2>
              <p>The bot will pick a random comment from the list</p>
              {this.state.data.comments.map((item, index) => (
                <div data-aos="fade-up" className="mini-cards" key={index}>
                  {item}
                  <i onClick={() => this.deleteComment(index)} className="fas fa-trash"></i>
                </div>
              ))}
              <div className="check-box-contaner">
                <p>
                  Tag<strong> 5 </strong>random users after commenting
                </p>
                <input checked={this.state.data.tagPeopleThatCommented} type="checkbox" name="tagPeopleThatCommented" onChange={this.handleTagPeopleWhoCommented} />
              </div>
              <input className="add-input" name="comment" placeholder="Add Comments" onChange={this.handleChange} />
              <button type="button" onClick={this.insertComment}>
                ADD
              </button>
            </div>

            {/* Comments */}

            <button id="update-btn">APPLY CHANGES</button>
            <i onClick={this.handleSignOut} class="fas fa-sign-out-alt"></i>
          </form>
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
