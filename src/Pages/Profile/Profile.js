import "./Profile.scss";
import profile_bg from "../../img/profile-bg.jpg";
import person from "../../img/person.jpg";
import Grid from "@mui/material/Grid";
import Post from "../Post/post";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import RightSideBar from "../RightSidebar/rightSideBar";

const Profile = (props) => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({
    friends: [],
    travelHistory: [],
    badges: [],
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else if (localStorage.getItem("token") != null) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        if (decoded) {
          setUser(decoded);
          fetch("http://localhost:3001/api/posts/getpostbyid", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              id: id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setPosts(data.posts);
              console.log(data.posts);
            })
            .catch((error) => {
              console.log(error);
            });
          fetch(`http://localhost:3001/api/user/id/${id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setProfile(data.user);
              console.log(data.user);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="ProfilePage">
      <div className="All_profile_content">
        <img
          src="https://img.freepik.com/free-vector/travel-tourism-illustration-with-resort-sightseeing-elements_1284-30189.jpg?w=1060"
          className="Bg_img"
        ></img>
        <div className="row">
          <div className="col-3">
            <div className="UserDetailOuterBox">
              <div className="img_container">
                <img src={profile.picUrl} className="profile_pic" />
              </div>

              <div className="UserDetailBox">
                <div className="UserProfileName">{profile.name}</div>
                <div className="UserProfileUsername">@{profile.username}</div>
                <div className="UserSubdetailBox">
                  <hr></hr>
                  <div className="BasicDetailFiels ">
                    <span className="BasicDetailFiels1 col">Age : </span>
                    <span className="BasicDetailFiels2 col">{profile.age}</span>
                  </div>
                  <div className="BasicDetailFiels ">
                    <span className="BasicDetailFiels1 col">Gender : </span>
                    <span className="BasicDetailFiels2 col">
                      {profile.gender}
                    </span>
                  </div>
                  <div className="BasicDetailFiels ">
                    <span className="BasicDetailFiels1 col">Email : </span>
                    <span className="BasicDetailFiels2 col">
                      {profile.email}
                    </span>
                  </div>
                  <div className="BasicDetailFiels ">
                    <span className="BasicDetailFiels1 col">Instagram : </span>
                    <span className="BasicDetailFiels2 col">NaN</span>
                  </div>
                  <div className="BasicDetailFiels ">
                    <span className="BasicDetailFiels1 col">Telegram : </span>
                    <span className="BasicDetailFiels2 col">NaN</span>
                  </div>
                </div>
                {/* <h4>{profile.name}</h4>
                <h6>@{profile.username}</h6>
                <div className="UserSubdetailBox">
                  <h3>BASIC DETAILS</h3>
                  <br></br>
                  <h6>Age: {profile.age}</h6>
                  <h6>Gender: {profile.gender}</h6>
                  <h6>Email: {profile.email}</h6>
                  <h6>Instagram: -NAN-</h6>
                  <h6>Telegram: -NAN-</h6>
                  <br></br>
                  <h3>STATS</h3>
                  <br></br>
                  <h6>{profile.friends.length} Friends</h6>
                  <h6>{profile.badges.length} Challenges Completed</h6>
                  <h6>{profile.travelHistory.length} Places Travelled</h6>
                </div> */}
                <div className="right-sidebar" style={{ width: "100%" }}>
                  <RightSideBar></RightSideBar>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="MiddleBox">
              <div className="userStateBox">
                <div className="row">
                  <div className="col-4">
                    <div className="stateOuterBox">
                      <div className="innerBoxNo">{profile.friends.length}</div>
                      <div className="innerBoxText">Friends</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stateOuterBox">
                      <div className="innerBoxNo">{posts.length}</div>
                      <div className="innerBoxText">Posts</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stateOuterBox">
                      <div className="innerBoxNo">
                        {profile.travelHistory.length}
                      </div>
                      <div className="innerBoxText">Places Visited</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="PostBoxProfile">
                {posts
                  .sort((a, b) => Date(a.created_at) - Date(b.created_at))
                  .map((data) => (
                    <div>
                      <Post {...data} style={{ width: "1000px" }} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="BadgesBox">
              <div className="row badgescountshow">
                <div className="badgesCountText col-6">Total Badges -</div>
                <div className="badgesCount col-1">
                  {" "}
                  {profile.badges.length}
                </div>
              </div>

              <div className="badgesArray">
                {profile.badges.map((mp) => (
                  <img className="badgesImges" src={mp} alt="" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="Profile_page">
    //   <div className="All_profile_content">
    //     <img src={profile_bg} className="Bg_img"></img>
    //     <Grid container sty>
    //       <Grid item xs={12} sm={6} md={4} lg={4} className="basic_detail">
    //   <div className="img_container">
    //     <img src={profile.picUrl} className="profile_pic" />
    //   </div>

    //   <div className="detail_container">
    //     <h4>{profile.name}</h4>
    //     <h6>@{profile.username}</h6>
    //     <div className="subdetail_container">
    //       <h3>BASIC DETAILS</h3>
    //       <br></br>
    //       <h6>Age: {profile.age}</h6>
    //       <h6>Gender: {profile.gender}</h6>
    //       <h6>Email: {profile.email}</h6>
    //       <h6>Instagram: -NAN-</h6>
    //       <h6>Telegram: -NAN-</h6>
    //       <br></br>
    //       <h3>STATS</h3>
    //       <br></br>
    //       <h6>{profile.friends.length} Friends</h6>
    //       <h6>{profile.badges.length} Challenges Completed</h6>
    //       <h6>{profile.travelHistory.length} Places Travelled</h6>
    //     </div>
    //   </div>
    // </Grid>

    //       <Grid item xs={12} sm={6} md={8} lg={8} className="grid_content">
    // <div className="userStateBox">
    //   <div className="row">
    //     <div className="col-4">
    //       <div className="stateOuterBox">
    //         <div className="innerBoxNo">{profile.friends.length}</div>
    //         <div className="innerBoxText">Friends</div>
    //       </div>
    //     </div>
    //     <div className="col-4">
    //       <div className="stateOuterBox">
    //         <div className="innerBoxNo">{posts.length}</div>
    //         <div className="innerBoxText">Posts</div>
    //       </div>
    //     </div>
    //     <div className="col-4">
    //       <div className="stateOuterBox">
    //         <div className="innerBoxNo">
    //           {profile.travelHistory.length}
    //         </div>
    //         <div className="innerBoxText">Places Visited</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    //         <Grid container>
    //           {/* <Grid item xs={12} sm={12} md={6} lg={6} className="post_grid">
    //             <Post />
    //           </Grid> */}

    //           <div className="bodyPlace">
    //             {posts
    //               .sort((a, b) => Date(a.created_at) - Date(b.created_at))
    //               .map((data) => (
    //                 <div>
    //                   <Post {...data} style={{ width: "1000px" }} />
    //                 </div>
    //               ))}
    //           </div>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </div>
  );
};

export default Profile;
