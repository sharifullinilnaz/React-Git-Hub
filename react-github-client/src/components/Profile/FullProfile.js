import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, NavLink } from "react-router-dom";

export default function FullProfile(props) {
    
const { state, dispatch } = useContext(AuthContext);
const [follower, setFollowers] = useState([]);
const [following1, setFollowing] = useState([]);
const [data, setData] = useState([]);



if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
}

const url = "https://api.github.com/users/" + props.match.params.login;

useEffect(() => {
  fetch(url)
    .then((response) => response.json())
    .then(
      (d) => {
        setData(d)
  })
}, [data]);

  

useEffect(() => {
  fetch("https://api.github.com/users/" + props.match.params.login + "/followers")
    .then((response) => response.json())
    .then(
      (d) => {
        setFollowers(d)
      })
    }, [follower]);


  useEffect(() => {
  fetch("https://api.github.com/users/" + props.match.params.login + "/following")
    .then((response) => response.json())
    .then(
      (d) => {
        setFollowing(d)
      })
    }, [following1]);


    
const {avatar_url, name, public_repos, followers, following, login} = data;

const handleLogout = () => {
  dispatch({
    type: "LOGOUT"
  });
}


return (
  <Wrapper>
  <div className="container">
    <button onClick={()=> handleLogout()}>Logout</button>
    <div>
      <div className="content">
        <img src={avatar_url} alt="Avatar"/>
        <span>{name}</span>
        <span>{public_repos} Repos</span>
        <span>{followers} Followers:</span>
        <ul>
          {follower.map(item => (
                  <li><NavLink to={`/profile/${item.login}` }  >{item.login}</NavLink></li>
                  ))}
                </ul>
        <span>{following} Following: </span>
        <ul>                  
          {following1.map(item => (
                  <li><NavLink to={`/profile/${item.login}`}  >{item.login}</NavLink></li>
                  ))}
        </ul>

        <NavLink to={`/profile/${login}/full`}>More information</NavLink>
      </div>
    </div>
  </div>
</Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;
  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }
  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }
  }
}
`;