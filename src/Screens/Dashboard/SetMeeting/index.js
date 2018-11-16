import { firebase, getUsersData, pushData } from '../../../Config/firebase'
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import "./style.css";
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';

import Grid from '@material-ui/core/Grid';
import CardM from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import TinderCards from "../../../Components/TinderCards/TinderCards.js"

//swipeDeck library

import Cards, { Card } from 'react-swipe-deck'
// const data = ['Alexandre', 'Thomas', 'Lucien']

//redux
import { connect } from "react-redux"
import { updateUser } from "../../../Redux/Action/authAction"

//dialogbox
// import DialogBox from "../../../Components/DialogBox/DialogBox"

//sweetAlert2
import swal from "sweetalert2";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        // position: 'fixed',
        // bottom: theme.spacing.unit * 2,
        // right: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    card: {
        // maxWidth: 400,
        // minHeight: 280,
    },
});

class SetMeeting extends Component {
    constructor() {
        super();
        this.state = {
            allUsers: [],
            meetingDeck: true,
        }
        this.getUsersData = this.getUsersData.bind(this)
        this.showMeetingDeck = this.showMeetingDeck.bind(this)
        this.removeUser = this.removeUser.bind(this)
        this.swipeCard = this.swipeCard.bind(this)
        this.reqMeeting = this.reqMeeting.bind(this)
        this.action = this.action.bind(this)

        this.getUsersData()
    }

    getUsersData() {
        // const uid = firebase.auth().currentUser.uid;
        const arr = [];
        firebase.database().ref(`Registration/`).on("child_added", async data => {
            const { allUsers } = this.state
            allUsers.push(data.val())
            this.setState({ allUsers: this.state.allUsers })
            // let obj = data.val();
            // let key = data.key;
            // let currentKey = firebase.auth().currentUser.uid;
            // if (key !== currentKey) {
            //     arr.push(obj)
            // }
        })
        // console.log("fetching data-----array", arr)
        // this.setState({
        //     allUsers: arr
        // })
        // console.log("fetching data-----allUsers", arr)
    }

    showMeetingDeck() {
        this.setState({
            meetingDeck: !this.state.meetingDeck
        })
    }

    componentWillMount() {
        // this.getUsersData()
        // setTimeout(() => {

        //     console.log("a", this.state.allUsers)
        // }, 3000);
    }


    action(items) {
        // console.log("duck", items)
    }

    removeUser(index) {
        const { allUsers } = this.state
        allUsers.splice(index, 1);
        this.setState({
            allUsers
        })
        console.log("removed", index)
    }

    reqMeeting() {
        console.log("startMeeting")
    }

    reqMeeting = (usersInfo) => {
        this.setState({ dialogOpen: true });
        console.log('chal gaya', this.props)
        swal({
            title: `${usersInfo.displayName}`,
            text: "Are you sure you want to meet him",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure'
        })
            .then((result) => {
                if (result.value) {
                    const uid = firebase.auth().currentUser.uid
                    this.props.history.push(`/profile/dashboard/${uid}/meeting/location`,{usersInfo});
                }
            })
    };


    swipeCard() {
        const { classes } = this.props
        const { allUsers, data, dialogOpen } = this.state;
        console.log("allUsers", allUsers)
        // debugger;
        return (
            <div className='master-roots'>
                <Cards onEnd={() => console.log('end')} >
                    {allUsers.map((usersInfo, index) =>
                        <Card
                            key={usersInfo}
                            onSwipeLeft={() => this.action(usersInfo)}
                            onSwipeRight={() => this.reqMeeting(usersInfo)}>

                            <Grid contained >

                                <Grid item xs={12} sm={12}>
                                    <TinderCards reqMeeting={this.reqMeeting} removeUser={this.removeUser} userIndex={index} usersInfo={usersInfo} removeUser={this.removeUser} reqMeeting={this.reqMeeting} />
                                </Grid>

                            </Grid>
                        </Card>
                    )}
                </Cards>
            </div >
        )
    }

    render() {
        const { classes } = this.props;
        const { meetingDeck, allUsers } = this.state
        return (
            <div className="meetingTab">
                {!meetingDeck &&
                    <div> <div>
                        <Typography variant="h4">
                            Meeting Tab
                    </Typography>
                        <Typography>
                            Manage All Your Meetings At One Place
                    </Typography>
                    </div>
                        <Typography variant="h5">
                            “You haven’t done any meeting yet!”, try creating a new meeting!
                    </Typography>
                    </div>
                }
                <Button
                    variant="extendedFab"
                    aria-label="Delete"
                    className={classNames(classes.button, "floatBtn")}
                    onClick={this.showMeetingDeck}
                >
                    {!meetingDeck ? <AddIcon className={classes.extendedIcon} /> : <AccountCircle className={classes.extendedIcon} />}
                    {!meetingDeck ? "Set Meeting" : "Cancel Meeting"}
                </Button>
                {/* meeting cards */}
                <div>
                    {meetingDeck && this.swipeCard()}
                </div>

            </div>
        );
    };
}


SetMeeting.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(SetMeeting);

// export default SetMeeting;
const mapStateToProps = (state) => {
    console.log("state from component", state)
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}
// export default Login
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SetMeeting));
