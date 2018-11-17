import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import "./style.css";
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//redux
// import { connect } from "react-redux"
// import { updateUser } from "../../../Redux/Action/authAction"

// import { firebase } from '../../../Config/firebase'

//Carousel
import Carousel from '../../Components/Carousel/Carousel'

//icons
import Check from '@material-ui/icons/Check';
import Cancel from '@material-ui/icons/Clear';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    card: {
        // position: 'absolute',
        // top: theme.spacing.unit * 2,
        // bottom: theme.spacing.unit * 2
    },
});

class TinderCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, usersInfo, removeUser, reqMeeting, userIndex } = this.props
        console.log("users", usersInfo)
        return (
            <div>
                <Card className={classNames(classes.card, "swipeCard")}>
                    {console.log("dfsdsffsd",usersInfo.images[0].avatarURL)}
                    <CardActionArea>
                        <Carousel usersImage={usersInfo.images} />
                    </CardActionArea>

                    <CardContent>
                        <Typography className="userFullName">
                            {usersInfo.displayName}
                        </Typography>
                        <Typography className="userNickName">
                            {usersInfo.nickName}
                        </Typography>
                    </CardContent>

                    <CardActions>

                        <label htmlFor="contained-button-remove" className="removeBtn">
                            <Button variant="fab" mini color="secondary" aria-label="Add" className={classes.button} onClick={() => removeUser(userIndex)}>
                                <Cancel />
                            </Button>
                        </label>

                        <label htmlFor="contained-button-accept" className="acceptBtn">
                            <Button variant="fab" mini color="primary" aria-label="Add" className={classes.button} onClick={() => reqMeeting(usersInfo)}>
                                <Check />
                            </Button>
                        </label>

                    </CardActions>

                </Card>
            </div>
        );
    };
}


TinderCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TinderCards);
