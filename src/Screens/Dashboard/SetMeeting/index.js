import { firebase, getUsersData } from '../../../Config/firebase'
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
// import { connect } from "react-redux"
// import { updateUser } from "../../../Redux/Action/authAction"


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
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
            allUsers: null,
            meetingDeck: false,
            data: ['Alexandre', 'Thomas', 'Lucien']

        }
        this.getUsersData = this.getUsersData.bind(this)
        this.showMeetingDeck = this.showMeetingDeck.bind(this)
        this.removeUser = this.removeUser.bind(this)
        this.swipeCard = this.swipeCard.bind(this)
        this.reqMeeting = this.reqMeeting.bind(this)
        this.action = this.action.bind(this)
    }

    getUsersData() {
        // const uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`Registration/`).once("value", data => {
            this.setState({ allUsers: data.val() })
            let obj = data.val()
            console.log("getting--", obj)
        })
    }

    showMeetingDeck() {
        this.setState({
            meetingDeck: !this.state.meetingDeck
        })
    }

    componentDidMount() {
        let a = this.getUsersData()
        setTimeout(() => {

            console.log("a", this.state.allUsers)
        }, 3000);
    }


    action(items) {
        console.log("fuck", items)
    }

    removeUser(items) {
        const { data } = this.state
        console.log("fuck", items)
    }

    reqMeeting() {
        console.log("startMeeting")
    }

    swipeCard() {
        const { classes } = this.props
        const { allUsers, data } = this.state
        console.log(this.state.data)

        return (
            <div className='master-roots'>

                <Cards onEnd={() => console.log('end')} >
                    {
                        data.map((items, index) =>
                            <Card
                                onSwipeLeft={() => {
                                    this.action(items)
                                }}
                                onSwipeRight={this.reqMeeting}>

                                <Grid contained spacing={4} >

                                    <Grid item xs={12} sm={12}>

                                        <TinderCards items={items} />

                                    </Grid>

                                </Grid>

                            </Card>
                        )
                    }
                </Cards >
            </div>
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

export default withStyles(styles)(SetMeeting);

                            // export default SetMeeting;
// const mapStateToProps = (state) => {
//     console.log("state from component", state)
//     return {
//         user: state.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (user) => dispatch(updateUser(user))
//     }
// }
// // export default Login
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
