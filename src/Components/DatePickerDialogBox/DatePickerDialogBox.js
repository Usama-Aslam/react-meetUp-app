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
import { firebase } from '../../Config/firebase'


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
            date: new Date()
        }
        this.onChange = this.onChange.bind(this)
    }

    sendInvitation = () => {

    };

    goBack = () => {
        this.props.handleDialogClose()
    };

    onChange = date => {
        this.setState({ date })
    }

    render() {
        const { usersInfo, classes, address, meetingPlace } = this.props
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
                        Muhammad Usama
                    </Typography>
                    <Typography component="p">
                        <strong>Phone No: </strong>
                        3213121231
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
                    <Button size="small" color="secondary" onClick={this.sendInvitation}>Send Invitation</Button>
                </CardActions>
            </div>
        );
    }
}
DatePickerDialogBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickerDialogBox);