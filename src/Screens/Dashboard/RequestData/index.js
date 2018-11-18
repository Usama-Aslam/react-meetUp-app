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

//AddCalender library
import AddToCalendar from 'react-add-to-calendar'

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

class RequestData extends Component {
    constructor() {
        super();
        this.state = {
            allRequestData: [],
            keys: [],
            open: false,
            destination: {
                latitude: null, longitude: null
            },
            coords: { latitude: null, longitude: null },
            requestNodes: [],
            // requestNodes: [{
            //     clientUid: 'dskfjsfhksdhksd',
            //     userUid: "K9DwEyp0KRUxofHRaVh17OViU9w2",
            //     avatar: "kfdfsdsfsdfsfsdsdfsd",
            //     clientName: "Muhammad Usama",
            //     date: [new Date().toLocaleString(), new Date().getTime()],
            //     clientlocation: { lat: 23, lng: 55 },
            //     mylocation: { lat: 23, lng: 55 },
            //     destinationLocation: { lat: 34, lng: 66 },
            //     destinationDescription: { meetingPlace: "optp", address: ['baldia', 'town ', 'karachi'] },
            //     statuses: "pending"
            // }]
        }
        this.getNavigation = this.getNavigation.bind(this)
        this.getData();
    }

    async  getData() {
        console.log("this props of get data", this.props)
        let { requestNodes, allRequestData } = this.state;

        // const uid = "LsXOM3horCOTNgGhRtKDQjZ7AcE2"
        const uid = firebase.auth().currentUser.uid;
        let Ref = firebase.database().ref(`Data/${uid}/request`)
        let arr = []
        // let newArr = []


        await Ref.on("value", async data => {
            requestNodes = [];
            console.log('on value', data.val())
            let obj = data.val();
            for (const key in obj) {
                for (const keys in obj[key]) {
                    console.log(obj[key][keys])
                    requestNodes.push(obj[key][keys])
                }
            }
            this.setState({
                requestNodes
            })
        })
    }
    // componentWillUnmount() {
    //     // const uid = firebase.auth().currentUser.uid
    //     const uid = "K9DwEyp0KRUxofHRaVh17OViU9w2"
    //     let Ref = firebase.database().ref(`Data/${uid}/request`)
    //     Ref.off('child_added')
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
        const { requestNodes } = this.state
        firebase.database().ref("/").child(`Data/${userUid}/meeting/${clientUid}/${key}/statuses`).set(status);
        // delete requestNodes[index]
        // this.setState({
        //     requestNodes: this.state.requestNodes
        // })
    }



    render() {
        const { classes } = this.props
        const { allRequestData, requestNodes, destination, coords, keys } = this.state
        // console.log("allMeeting", allRequestData)
        // console.log("keys", keys)
        return (
            <div>
                {requestNodes.length == 0 ?
                    <div>
                        <div>
                            <Typography variant="h4">
                                Request Tab
                    </Typography>
                            <Typography>
                                Find All Your Invitations Here
                    </Typography>
                        </div>
                        <Typography variant="h5">
                            You Don't Have Any Request Yet.
                    </Typography>
                    </div>
                    :
                    <div className="searchLocation_div">
                        {requestNodes.map((items, index) => {
                            return <div key={index}>
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

RequestData.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestData));
