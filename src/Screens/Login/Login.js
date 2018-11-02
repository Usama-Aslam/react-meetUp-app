import React, { Component } from 'react';

import 'typeface-roboto';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import color from '@material-ui/core/colors';

import firebase from './../../Config/firebase';

import '../Login/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
    }

    login() {
        var provider = new firebase.auth.FacebookAuthProvider();
        const { showProfile } = this.props
        provider.setCustomParameters({
            'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user.toJSON();
            console.log(user)

            if (user.lastLoginAt === user.createdAt) {

            }
            // ...
        })
            .then(() => {
                this.props.history.push("/profile")
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    render() {
        const { showProfile } = this.props
        console.log("login props", this.props)
        return (
            <div id="LoginPanel">
                <p>Log in to continue to Meetup</p>
                <Card className="LoginDiv">
                    <CardContent>
                        <Typography>
                            New To MeetUp? Sign Up With Facebook
                        </Typography>
                    </CardContent>
                    <CardActions className="loginBtn">
                        <Button onClick={() => this.login()}
                            variant="contained" color="primary">
                            Log In With Facebook
                        </Button>
                    </CardActions>
                </Card>
            </div >
        );
    };
}

export default Login;