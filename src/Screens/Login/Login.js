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

import { firebase, getUsersData } from './../../Config/firebase';

import '../Login/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { updateUser } from "../../Redux/Action/authAction"

class Login extends Component {
    constructor(props) {
        super(props);
        this.getUsersData = this.getUsersData.bind(this)
    }

    getUsersData() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`Registration/`).on("child_added", data => {
            let obj = data.val()
            console.log("getting--", obj)
        })
    }

    login() {
        var provider = new firebase.auth.FacebookAuthProvider();
        // const { showProfile } = this.props for conditional display
        provider.setCustomParameters({
            'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user.toJSON();

                // if (user.lastLoginAt === user.createdAt) {

                // }
                // ...
                return user
            })
            .then(async (user) => {
                console.log(user)

                this.props.updateUser(user)
                this.props.loginStateFunction()

                this.props.history.push("/profile/sklfslfsfslkfjsdfk")
            })
            .catch((e) => {
                // console.log(this.props)
                // // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
                console.log(e)
            });
    }

    render() {
        const { showProfile } = this.props
        // console.log("loginProfle", this.props)
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

const mapStateToProps = (state) => {
    console.log("state from component", state)
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}
// export default Login
export default connect(mapStateToProps, mapDispatchToProps)(Login);
