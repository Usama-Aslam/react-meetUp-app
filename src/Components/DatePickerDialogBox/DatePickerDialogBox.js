import React from 'react';
import './style.css';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//DatePicker
import DateTimePicker from 'react-datetime-picker';

//firebase
import { firebase, pushMeetingData, getSpecificUsersData } from '../../Config/firebase'

//redux
import { connect } from 'react-redux'
import { updateUser } from "../../Redux/Action/authAction"

const styles = {
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
};

class DatePickerDialogBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.dialogBoxOpen,
            date: new Date(),
            currentUserData: []
        }
        this.onChange = this.onChange.bind(this)
        this.sendInvitation = this.sendInvitation.bind(this)
    }

    sendInvitation = async () => {
        const currentUserUid = firebase.auth().currentUser.uid

        await getSpecificUsersData(currentUserUid)
            .then((data) => {
                this.setState({
                    currentUserData: data.val()
                })
            })

        const { date, currentUserData } = this.state
        const { destination, usersInfo, address, meetingPlace, user } = this.props
        const clientUid = usersInfo.uid;
        console.log("destination", destination)
        console.log("meetingplace address", meetingPlace, address)

        console.log("thisdata", currentUserData.displayName)
        //obj for sending person
        let sendObj = {
            clientUid: usersInfo.uid,
            userUid: currentUserUid,
            avatar: usersInfo.avatar,
            clientName: usersInfo.displayName,
            date: [date.toLocaleString(), date.getTime()],
            clientlocation: { lat: usersInfo.location.lat, lng: usersInfo.location.lng },
            myLocation: { lat: currentUserData.location.lat, lng: currentUserData.location.lng },
            destinationLocation: { lat: destination.latitude, lng: destination.longitude },
            destinationDescription: { meetingPlace, address },
            statuses: "Pending"
        }
        //obj for receiving person
        let receiveObj = {
            clientUid: currentUserUid,
            userUid: usersInfo.uid,
            avatar: currentUserData.avatar,
            clientName: currentUserData.displayName,
            date: [date.toLocaleString(), date.getTime()],
            clientlocation: { lat: currentUserData.location.lat, lng: currentUserData.location.lng },
            myLocation: { lat: usersInfo.location.lat, lng: usersInfo.location.lng },
            destinationLocation: { lat: destination.latitude, lng: destination.longitude },
            destinationDescription: { meetingPlace, address },
            statuses: "Pending"
        }
        pushMeetingData(sendObj, receiveObj, currentUserUid, clientUid)
            .then((flag) => {
                if (flag) {
                    const uid = firebase.auth().currentUser.uid
                    this.props.history.replace(`/profile/dashboard/${uid}`)
                }
            })
    };

    //to get back to searching location
    goBack = () => {
        this.props.handleDialogClose()
    };

    //for changing date
    onChange = date => {
        this.setState({ date })
    }
    componentWillUnmount() {
        firebase.database().ref("/").off()
    }

    render() {
        const { usersInfo, classes, address, meetingPlace } = this.props
        console.log("dateprops", this.props)
        console.log("usersInfo dekho", usersInfo)
        return (
            <div className="meetingTimeDiv">
                <Typography variant="h5" component="h2">
                    Meeting Time
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Please check your client details and Select desired time for Meeting.
                </Typography>

                <div className="contentDiv">
                    <Typography component="p">
                        <strong>Client Name : </strong>
                        {usersInfo.displayName}
                    </Typography>
                    <Typography component="p">
                        <strong>Phone No: </strong>
                        {usersInfo.phone}
                    </Typography>
                    <Typography component="p">
                        <strong>Place: </strong>
                        {meetingPlace}
                    </Typography>
                    <Typography component="p">
                        <strong>Address: </strong>
                        {address}
                    </Typography>
                    <Typography component="p">
                        <strong>Date: </strong>
                        <DateTimePicker
                            onChange={this.onChange}
                            value={this.state.date}
                            calendarClassName="clan"
                        />
                        <br />
                    </Typography>
                </div>
                <CardActions>
                    <Button size="small" onClick={this.goBack}>Back</Button>
                    <Button size="small" color="primary" onClick={() => this.sendInvitation()}>Send Invitation</Button>
                </CardActions>
            </div>
        );
    }
}
DatePickerDialogBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(DatePickerDialogBox);

const mapStateToProps = (state) => {
    console.log('state from component', state)
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DatePickerDialogBox))