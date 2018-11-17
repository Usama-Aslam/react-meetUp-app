import React from 'react';
import "./style.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import MeetingData from '../../Screens/Dashboard/MeetingData/index'
import RequestData from '../../Screens/Dashboard/RequestData/index'

import { firebase } from '../../Config/firebase'


import AddIcon from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';

//Redux
import { connect } from 'react-redux';
import { updateUser } from '../../Redux/Action/authAction'


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
        // position: 'fixed',
        // bottom: theme.spacing.unit * 2,
        // right: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
        meetingDeck: true
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    showMeetingDeck = (event) => {
        const uid = firebase.auth().currentUser.uid
        this.props.history.push(`/profile/dashboard/${uid}/meeting`);
        this.setState({
            meetingDeck: !this.state.meetingDeck
        })
    }

    render() {
    
        const { classes, theme } = this.props;
        const { meetingDeck } = this.state
        console.log("dashmenu props", this.props)
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Meetings" />
                        <Tab label="Requests" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    className="swipeDeck"
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        {/* //here we are rendering meeting data */}
                        <MeetingData {...this.props} />
                    </TabContainer>

                    <TabContainer dir={theme.direction}>
                        {/* //here we are rendering request data */}
                        <RequestData {...this.props} />
                    </TabContainer>
                </SwipeableViews>
                <Button
                    variant="extendedFab"
                    aria-label="startMeeting"
                    className={classNames(classes.button, 'extBtn_lg')}
                    onClick={this.showMeetingDeck}
                >
                    <AddIcon className={classes.extendedIcon} />
                    Set Meeting
                </Button>
                <Button
                    variant="extendedFab"
                    aria-label="Delete"
                    className={classNames(classes.button, 'extBtn_sm')}
                    onClick={this.showMeetingDeck}
                >
                    <AddIcon className={classes.extendedIcon} />
                </Button>
            </div >
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(FullWidthTabs));


{/* <Button
    variant="extendedFab"
    aria-label="Delete"
    className={classNames(classes.button, "floatBtn")}
    onClick={this.showMeetingDeck}
>
    {!meetingDeck ? <AddIcon className={classes.extendedIcon} /> : <AccountCircle className={classes.extendedIcon} />}
    {!meetingDeck ? "Set Meeting" : "Cancel Meeting"}
</Button> */}