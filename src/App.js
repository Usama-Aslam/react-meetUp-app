import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Login';
import Profile from './Screens/Profile/Profile';
// import * as firebase from 'firebase'
import firebase from './Config/firebase'
import Routes from "./Config/Router/router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  constructor() {
    super()
    this.state = {
      loginFlag: false,
      isAvailable: false

    }
    this.showProfile = this.showProfile.bind(this);
  }

  showProfile() {
    this.setState({
      loginFlag: true
    })
  }

  render() {
    const { loginFlag } = this.state
    return (
      <div className="App">
        {/* {!loginFlag && <Login showProfile={this.showProfile} />}
        {loginFlag && <Profile />} */}
        <Routes loginFlag={loginFlag} />
      </div>
    );
  }
}

export default App;
