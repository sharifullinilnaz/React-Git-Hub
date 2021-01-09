import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

export default function ProfilePage(props) {

const { state, dispatch } = useContext(AuthContext);
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

 
const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
}

const api = axios.create({
  baseURL: 'https://api.github.com',
});

  
  const [users, setUsers] = useState([]);


  const [searchUser, setSearchUser] = useState('');
  
  useEffect(() => {
  const storageUsers = localStorage.getItem('@GithubFinder:users');
  if (storageUsers) {
      setUsers(JSON.parse(storageUsers));
  } else {
      setUsers([]);
  }
  }, []);

  useEffect(() => {
  localStorage.setItem('@GithubFinder:users', JSON.stringify(users));
  }, [users]);

    async function handleAddUsers(e) {
    e.preventDefault();
    const response = await api.get(`users/${searchUser}`);
    const user = response.data;
    setUsers([user]);
    setSearchUser('');
  }

const {login, followers, following, public_repos, name, bio, email, avatar_url} = data;

return(
    <Wrapper>

<div class="header">
		<div class="container">
		<div class="logo">
			<a href="#"><img class = "graphic_logo" src=".../public/xlLEwTMw8rM.jpg" alt="dasda"/></a>
		
    			<div class="search">
          <form onSubmit={handleAddUsers}>
            <input
            value={searchUser}
            onChange={e => setSearchUser(e.target.value)}
            placeholder="Enter a Github User "
            />
        </form>
   				</div>
  			<div class="avatart__logo">	
				<a href="#"><img class = "avatar_github_logo" src="C:\Users\User\Desktop\react-github-client\react-github-client\public\xlLEwTMw8rM.jpg" alt="" /></a>
			</div>


</div>
		</div>
    <div>
            {users.map(user => (
            <Link key={user.name} to={`/profile/${user.login}`}>
                <img src={user.avatar_url} alt={user.login} />
                <div>
                <strong>{user.name}</strong>
                <p id="userbio">{user.bio}</p>
                <h5>@{user.login}</h5>
                </div>
            </Link>
            ))}
        </div>
	</div>
  
  
  <div class="content">

          

<div class="profile">
        <div class="container">
            <div class="profile__body">
                <div class="profile__row">
                    <div class="profile__column">
                        <div class="profile__item left">
                            <div class="profile__item__login">
                                <span>Имя пользователя: <span>{name}</span></span>
                            </div>

                            <div class="profile__item__name">
                                <span>Настоящее имя: <span>{login}</span></span>
                            </div>

                            <div class="profile__item__email">
                                <span>Email: <span>{email}</span></span>
                            </div>


                            <div class="profile__item__followers">
                                <span>Followers: <span>{followers}</span></span>
                            </div>

                            <div class="profile__item__following">
                                <span>Following: <span>{following}</span></span>
                            </div>



                            
                        </div>
                    </div>

                    <div class="profile__column">
                        <div class="profile__item">
                        <div class="image__item">
                            <img src={avatar_url} class="img__avatar" alt="" />

                        
                        </div>

                        <div class="profile__item__description">
                                {bio}
                        </div>

                        <div class="profile__item__repo">
										<span>
										<img src="img/icons/folders.png"  alt="" />
										<img src="img/icons/file.png" class="img__repo" alt="" />
										</span>
						</div>

                    </div>
                </div>
                    
                </div>
            </div>
        </div>
    </div>

</div>

<div class="footer">
		<div class="footer__name">2021 © Все права защищены</div>
		<div class="footer__name">React course ITIS</div>
		<div class="footer__name"><button class="btn-logout" onClick={()=> handleLogout()}>Logout</button></div>
	</div>

    </Wrapper>
);
}

const Wrapper = Styled.section`
* {
  padding: 0;
  margin: 0;
  border: 0; }

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box; }

:focus, :active {
  outline: none; }

a:focus, a:active {
  outline: none; }

nav, footer, header, aside {
  display: block; }

html, body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%; }

input, button, textarea {
  font-family: inherit; }

input::-ms-clear {
  display: none; }

button {
  cursor: pointer; }

button::-moz-focus-inner {
  padding: 0;
  border: 0; }

a, a:visited {
  text-decoration: none; }

a:hover {
  text-decoration: none; }

ul li {
  list-style: none; }

img {
  vertical-align: top; }

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit; }

/*--------------------*/

body {
  background-color: #fff;
  color: #000;
  font-family: Arial;
   
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
}
.content {
  flex: 0 1 auto;
  padding-top: 100px;
  width: auto;
}


.container {

  width: 1220px;
  margin: 0 auto;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
}



.profile {
  padding: 0px 0 0 0;

}
.profile__body {
  margin: 0 auto;
}
.profile__row {
  display: flex;
  margin: 0 -50px;
}
.profile__column {
  display: flex;
  flex: 0 1 50%;
  padding: 0 50px;
  justify-content: center;

}
.profile__item {
   display: flex;
   flex-direction: column;
   font-size: 20px;
  line-height: 65px;
  
  
  letter-spacing: 0.025em;
  margin: 46px 0 0 0;
}


.profile__item__button {
  margin: 46px 0 0 0;
}

.img__avatar {
  border-radius: 50%;
  height: 350px;
  width: 350px;
  border: 3px solid #00a8e1;
}

.profile__item__description {
  padding-top: 20px;
}

.left {
  padding: 40px 0 0 0;
}

.profile__item__repo {
  padding-top: 30px;
}

.img__repo {
  padding-left: 50px;
}

.logo {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.graphic_logo {
  box-sizing: border-box;
  max-width: 100%;
  height: 50px;

}

.avatar_github_logo {
  box-sizing: border-box;
  max-width: 50px;
  height: 40px;
  border-radius: 100%;  
}


  * {box-sizing: border-box;}
form {
  width: auto;
  float: right;
  margin-right: 30px;
}
input {

  padding-top: 2px;
  width: 250px;
  height: 42px;
  padding-left: 15px;
  border-radius: 42px;
  border: 2px solid #324b4e;
  outline: none;
  position: relative;
  transition: .3s linear;
}
input:focus {
  width: 300px;
}
button {
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  position: absolute;
  top: -2px;
  right: 0;
}

.footer {
  position: fixed; /* Фиксированное положение */
  left: 0; bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 50px;
  margin-top: 50px;
  background-color: #000;
  color: #fff;
  opacity: 0.6;
  
}



.btn-logout {
  all: unset;
    width: 100px;
    height: 35px;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    font-family: Arial;
    border: 1px solid #0041C2;
    
    &:hover{
      background-color: #fff;
      color: #0041C2;
}
}
`;