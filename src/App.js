import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Login';
import Profile from './Screens/Profile/Profile';

// import * as firebase from 'firebase'

import { firebase } from './Config/firebase'
import Routes from "./Config/Router/router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AppBar from "./Components/appBar/AppBar"

//redux
import { Provider } from "react-redux";
import store from './Redux/store'
import { connect } from "react-redux"


class App extends Component {
    constructor() {
        super()
        this.state = {
            loginFlag: false,
            isAvailable: false
        }
        this.showProfile = this.showProfile.bind(this);
        this.hideProfile = this.hideProfile.bind(this);
    }

    showProfile() {
        this.setState({
            loginFlag: true
        })
    }

    hideProfile() {
        this.setState({
            loginFlag: false
        })
    }
    render() {
        const { loginFlag } = this.state
        return (
            <Provider store={store}>
                <div className="App">
                    {!loginFlag && <AppBar />}
                    <Routes showProfile={this.showProfile} hideProfile={this.hideProfile} />
                </div >
            </Provider>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.authReducer.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // updateState: (user)=>dispatch(updateUser(user))
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
