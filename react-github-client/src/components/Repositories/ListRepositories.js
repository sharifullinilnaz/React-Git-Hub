import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import { AuthContext } from "../../App";
import { Redirect, Link} from "react-router-dom";
import axios from 'axios';

export default function ListRepositories(props) {

  
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const api = axios.create({
      baseURL: 'https://api.github.com',
    });
   if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const { repos_url, login } = state.user
    

    


    const handleLogout = () => {
      dispatch({
        type: "LOGOUT"
      });
    }
    
    useEffect(() => {
      api.get(`users/` + props.match.params.login + `/repos`).then(response => {
        setData(response.data);
      });
    }, [state.user]);
   
  
    return (
      <div>
      <Wrapper>
        <div className="container">
          <button onClick={()=> handleLogout()}>Logout</button>

        </div>
      </Wrapper>
      <ReposList>
      {data.map(repository => (
        <Link className="link" key={repository.id} to={`/repository/${repository.owner.login}/${repository.name}`}>
              
                  <div>                 
                    <strong>{repository.name}</strong>
                    <p>{repository.description}</p>
                    <div className="repoInfo">
                    <p className="p2">
                      language:  {repository.language}
                    </p>
                    </div>
                    
                  </div>
                  
        </Link>
                  
                  ))}
      </ReposList>
      </div>
    );
  }
  
  const Wrapper = Styled.section`
  .container{
    display: flex;
    flex-direction: column;
    
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
  const ReposList = Styled.div`
  margin-top: 5px;
  margin-bottom: 5%;
  .link {
    text-decoration: none;
    background: LightSkyBlue;
    border-radius: 10px;
    width: 40%;
    padding: 20px;
    display: flex;
    justify-content: center;
    margin-left: 30%;
    align-items: center;
    transition: transform 0.4s;
    & + .link {
      margin-top: 16px;

    }
    &:hover {
      transform: translateX(-10px);
      box-shadow: 2px 2px white, 8px 8px Navy;

    }
    div {      
      
      font-size: 25px;
      color: MidnightBlue;

      p {
        font-size: 20px;
        color: DarkSlateBlue;
        margin-top: 5px;
      }
    }
    
  }
`;