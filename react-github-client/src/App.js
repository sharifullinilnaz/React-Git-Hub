import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import FullProfile from './components/Profile/FullProfile';
import FullRepository from './components/Repositories/FullRepository';
import ProfilePage from './components/Profile/ProfilePage';
import ListRepositories from "./components/Repositories/ListRepositories";
import { initialState, reducer } from "./store/reducer";


export const AuthContext = React.createContext(initialState);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(reducer,initialState);
  
  return (
    <AuthContext.Provider
      value={
        {
        state,
        dispatch
      }
    }
    >
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile/:login" component={FullProfile}/>
        <Route exact path="/repositories/:login" component={ListRepositories} />
        <Route exact path="/repository/:owner/:name" component={FullRepository} />
        <Route exact path="/" component={Home}/>
        <Route exact path="/profile/:login/full" component={ProfilePage}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;