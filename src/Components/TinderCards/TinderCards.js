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


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    card: {
        // maxWidth: 500,
        // minHeight: 280,
    },
});

class TinderCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, usersInfo, removeUser, reqMeeting } = this.props
        return (
            <div>
                <Card className={classNames(classes.card, "swipeCard")}>
                    {/* {console.log(usersInfo.images[0].avatarURL)} */}
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
                            {usersInfo.displayName}
                        </Typography>
                        <Typography className="userNickName">
                            {usersInfo.nickName}
                        </Typography>
                    </CardContent>

                    <CardActions>

                        <label htmlFor="contained-button-remove" className="removeBtn">
                            <Button variant="outlined" component="span" className={classes.button} size="small"
                                onClick={() => removeUser(usersInfo)}
                            >
                                X
                          </Button>
                        </label>

                        <label htmlFor="contained-button-accept" className="acceptBtn">
                            <Button variant="outlined" component="span" className={classes.button} size="small"
                                onClick={() => reqMeeting(usersInfo)}>
                                L
                            </Button>
                        </label>

                    </CardActions>

                </Card>
                {/* <Grid container alignItems='center' justify='space-evenly' spacing={4}>
                    <Grid item xs={12} sm={12}>
                        <Grid spacing={4}>
                            <Card className={classes.card} >
                                <CardActionArea width="500">
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        
                                        
                                        image="{obj.images[0].avatarURL}"
                                    />
                                </CardActionArea>
                                <CardActions>
                                    <label htmlFor="contained-button-file-0" className="uploadBtnStyleLabel">
                                        <Button variant="outlined" component="span" className={classes.button} size="small">
                                            Upload-1
                                        </Button>
                                        <input
                                            hidden
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file-0"
                                            multiple
                                            type="file"
                                            name="0"
                                            onChange={(e) => this.uploadFile(e)}
                                        />
                                    </label>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid> */}
            </div>
        );
    };
}


TinderCards.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TinderCards);
