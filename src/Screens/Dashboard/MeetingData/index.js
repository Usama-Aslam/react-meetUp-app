import React, { Component } from 'react';
import './style.css'
// import setMeeting from '../../'

//expansion panel
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import classNames from 'classnames';

//expansion panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar';
import logo from '../../../logo.svg';

//getNavigation component

import Modal from '../../../Components/Models/Models'

//google add event
import AddToCalendar from 'react-add-to-calendar';

// //redux
import { connect } from "react-redux"
import { updateUser } from "../../../Redux/Action/authAction"

import { firebase, getMeetingData } from '../../../Config/firebase'


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%'
    }, heading: {
        fontSize: theme.typography.pxToRem(18),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.text.secondary,
        // alignItems: 'left',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'left',
    },
    column: {
        flexBasis: '10%',
    },
    columnSeconday: {
        flexBasis: '33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    }, paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class MeetingData extends Component {
    constructor() {
        super();
        this.state = {
            allMeetingData: [],
            keys: [],
            open: false,
            destination: {
                latitude: null, longitude: null
            },
            coords: { latitude: null, longitude: null },
            meetingNodes: [],
            // meetingNodes: [{
            //     clientUid: 'dskfjsfhksdhksd',
            //     userUid: "K9DwEyp0KRUxofHRaVh17OViU9w2",
            //     avatar: "kfdfsdsfsdfsfsdsdfsd",
            //     clientName: "Muhammad Usama",
            //     date: [new Date().toLocaleString(), new Date().getTime()],
            //     clientlocation: { lat: 23, lng: 55 },
            //     mylocation: { lat: 23, lng: 55 },
            //     destinationLocation: { lat: 34, lng: 66 },
            //     destinationDescription: { meetingPlace: "callifornia pizaa makers", address: ['baldia', 'town ', 'karachi'] },
            //     statuses: "Pending"
            // }],
        }
        this.getNavigation = this.getNavigation.bind(this)
        this.getData();
    }

    async getData() {
        console.log("this props of get data", this.props)
        // const uid = "K9DwEyp0KRUxofHRaVh17OViU9w2"
        const uid = firebase.auth().currentUser.uid;
        let Ref = firebase.database().ref(`Data/${uid}/meeting`)
        let arr = []
        let newArr = []
        await Ref.on("child_added", async data => {
            const { allMeetingData, meetingNodes } = this.state;
            let obj = data.val()
            // arr.push(data.val())
            arr.push(data.val())
            for (const key in arr) {
                for (const keys in arr[key]) {
                    newArr.push(arr[key][keys])
                    this.state.keys.push(keys)
                    this.setState({
                        keys: this.state.keys
                    })
                }
            }
            // firebase.database().ref().child('Data').orderByChild('statuses').on("child_changed", snap => {
            //     let status = document.getElementById(snap.key);
            //     status.innerHTML = snap.val()
            // })

            // await Ref.on("child_added", async data => {
            //     const { allMeetingData, meetingNodes } = this.state;
            //     let obj = data.val()
            //     // arr.push(data.val())
            //     arr.push(data.val())

            //     for (const key in arr) {
            //         for (const keys in arr[key]) {
            //             newArr.push(arr[key][keys])
            //             this.state.keys.push(keys)
            //             this.setState({
            //                 keys: this.state.keys
            //             })
            //         }
            //     }
            // allMeetingData.push(data.val())
            // this.setState({
            //     allMeetingData: this.state.allMeetingData
            // })
            // for (const key in allMeetingData) {
            //     for (const keys in allMeetingData[key]) {
            //         this.state.meetingNodes.push(allMeetingData[key][keys])
            //         this.state.keys.push(keys)
            //         this.setState({
            //             meetingNodes: this.state.meetingNodes,
            //             keys: this.state.keys
            //         })
            //     }
            // }
        })
        console.log("arr", arr);
        console.log('newArr', newArr);
        this.state.allMeetingData = arr;
        this.state.meetingNodes = newArr;
        this.setState({
            allMeetingData: arr,
            meetingNodes: newArr,
        })
    }
    // componentWillUnmount() {
    //     // const uid = firebase.auth().currentUser.uid
    //     const uid = "K9DwEyp0KRUxofHRaVh17OViU9w2"
    //     let Ref = firebase.database().ref(`Data/${uid}/meeting`)
    //     Ref.off();
    // }

    handleModelOpen = () => {
        this.setState({ open: true });
    };

    handleModelClose = () => {
        this.setState({ open: false });
    };

    getNavigation(desLocation, myLocation) {

        this.state.destination.latitude = desLocation.lat
        this.state.destination.longitude = desLocation.lng

        this.state.coords.latitude = myLocation.lat
        this.state.coords.longitude = myLocation.lng

        this.setState({
            destination: this.state.destination,
            coords: this.state.coords,
            open: true
        })

        console.log(desLocation, myLocation)
    }

    setInvitation(clientUid, userUid, key, index, status) {
        const { meetingNodes } = this.state
        const uid = firebase.auth().currentUser.uid
        firebase.database().ref("/").child(`Data/${userUid}/meeting/${clientUid}/${key}`).remove();
        // firebase.database().ref("/").child(`Data/${userUid}/meeting/${clientUid}/${key}/statuses`).set(status);
        // delete meetingNodes[index]
        // this.setState({
        //     meetingNodes: this.state.meetingNodes
        // })
    }



    render() {
        const { classes } = this.props
        const { allMeetingData, meetingNodes, destination, coords, keys } = this.state
        // console.log("allMeeting", allMeetingData)
        console.log("props", this.props.user)
        console.log("nods", meetingNodes)
        return (
            <div>
                {meetingNodes.length == 0 ?
                    <div>
                        <div>
                            <Typography variant="h4">
                                Meeting Tab
                    </Typography>
                            <Typography>
                                Manage All Your Meetings Here
                    </Typography>
                        </div>
                        <Typography variant="h5">
                            You Don't Have Any Meeting Yet.
                    </Typography>
                    </div>
                    :
                    <div className="searchLocation_div">
                        {meetingNodes.map((items, index) => {
                            return <div>
                                {console.log("asdfadf", items.destinationLocation)}
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classNames("clientName_div")}>
                                            <Avatar alt="avatar" src={items.avatar} className="client_avatar" />
                                            <Typography className={classNames(classes.heading, "clientName")}>{items.clientName}</Typography>
                                        </div>

                                        <div className={classNames('place_div')}>
                                            <Typography className={classes.secondaryHeading} variant="h5" component="h3"><span>{items.destinationDescription.meetingPlace}</span></Typography>
                                        </div>

                                        <div className={classNames('status_div')}>
                                            <Typography className={classes.secondaryHeading} variant="h6" component="h6" id={keys[index]}><span>{items.statuses}</span></Typography>
                                        </div>
                                    </ExpansionPanelSummary>

                                    <ExpansionPanelDetails className={classNames(classes.details, 'expansionPanelDetail_div')}>
                                        <div className={classNames("meetingDate_div")}>
                                            <Typography component="p"> <b>Date : </b>{items.date[0]} </Typography>
                                        </div>

                                        <div className={classNames("locationAddress_div")}>
                                            <Typography component="p"> <b>Address : </b>{items.destinationDescription.address[0]} {items.destinationDescription.address[1]} {items.destinationDescription.address[2]} </Typography>
                                        </div>

                                        <div className={classNames("locationNavigation_div")}>
                                            <Button size="small"
                                                onClick={() => {
                                                    this.getNavigation(items.destinationLocation, items.myLocation)
                                                }}
                                            >Direction</Button>
                                        </div>
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions>
                                        <Divider />
                                        <AddToCalendar
                                            event={{
                                                title: `Meeting with ${items.clientName}`,
                                                description: `Today is Your Meeting With ${items.clientName} At ${items.destinationDescription.meetingPlace}`,
                                                location: `${items.destinationDescription.address}`,
                                                startTime: new Date(items.date[1]).toLocaleDateString(),
                                                endTime: new Date(items.date[1]).toLocaleDateString()

                                            }}

                                            listItems={[
                                                { google: 'Google' }
                                            ]}
                                        />
                                        {/* <Button size="small"
                                            onClick={() => {
                                                this.setInvitation(items.clientUid, items.userUid, keys[index], index, "Cancelled")
                                            }}
                                        >Cancel</Button> */}
                                        {/* <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => this.accept(items.name)}
                                        >
                                            Accept
                                            </Button> */}
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </div>
                        })}
                    </div>
                }
                <div style={{ maxWidth: '700px', height: "400px" }}>
                    <Modal
                        open={this.state.open}
                        destination={destination}
                        coords={coords}
                        handleClose={this.handleModelClose}
                        handleOpen={this.handleModelOpen}
                        {...this.props}
                    />
                </div>
            </div>
        );
    };
}

MeetingData.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MeetingData));
