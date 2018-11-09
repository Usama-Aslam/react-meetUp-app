import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import "./style.css";
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//redux
// import { connect } from "react-redux"
// import { updateUser } from "../../../Redux/Action/authAction"

// import { firebase } from '../../../Config/firebase'


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

class TinderCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, items } = this.props
        return (
            <div>
                <Card className={classNames(classes.card, "swipeCard")}>
                    {console.log(items)}
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className={classes.media}
                            height="300"
                            image=""
                        />
                    </CardActionArea>

                    <CardContent>
                        <Typography className="userFullName">
                            {items}
                        </Typography>
                        <Typography className="userNickName">
                            NickName
                        </Typography>
                    </CardContent>

                    <CardActions>

                        <label htmlFor="contained-button-remove" className="removeBtn">
                            <Button variant="outlined" component="span" className={classes.button} size="small"
                                onClick={this.removeUser}
                            >
                                X
                          </Button>
                        </label>

                        <label htmlFor="contained-button-accept" className="acceptBtn">
                            <Button variant="outlined" component="span" className={classes.button} size="small"
                                onClick={this.reqMeeting}>
                                L
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
