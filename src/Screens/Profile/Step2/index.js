import React, { Component } from 'react';
import "../style.css"

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { firebase } from "../../../Config/firebase"

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    card: {
        maxWidth: 370,
        minHeight: 180,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class Steps2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{ avatarURL: null }, { avatarURL: null }, { avatarURL: null }]
        }
        this.uploadFile = this.uploadFile.bind(this);
    }

    async uploadFile(e) {
        // File or Blob named mountains.jpg
        const file = e.target.files[0];
        const fileN = +e.target.name;

        const fileBtn = document.getElementById(e.target.id);

        const { updateImageUrl } = this.props;
        const { images } = this.props.obj;

        // Upload file and metadata to the object 'images/mountains.jpg'

        var storageRef = firebase.storage().ref("images/" + file.name);
        var uploadTask = storageRef.put(file)

        document.getElementById(e.target.id).disabled = true

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            updateImageUrl(downloadURL, fileN)
            document.getElementById(e.target.id).disabled = false
        });
    }

    render() {

        const { classes, obj, updateObj } = this.props;
        const { images } = this.state
        console.log("images of steps", images)
        console.log("obj", obj)
        // console.log("images", this.state.images)

        return (
            <form noValidate autoComplete="off">
                <Grid container alignItems='center' justify='space-evenly' spacing={24}>
                    <Grid item xs={12} sm={4}>
                        <Grid spacing={24}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        height="200"
                                        image={obj.images[0].avatarURL}
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
                                            type="file"
                                            name="0"
                                            onChange={(e) => this.uploadFile(e)}
                                        />
                                    </label>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Grid spacing={24}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        height="200"
                                        image={obj.images[1].avatarURL}

                                    />
                                </CardActionArea>
                                <CardActions>
                                    <label htmlFor="contained-button-file-1" className="uploadBtnStyleLabel">
                                        <Button variant="outlined" component="span" className={classes.button} size="small">
                                            Upload-2
                                         </Button>
                                        <input
                                            hidden
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file-1"
                                            multiple
                                            type="file"
                                            name="1"
                                            onChange={(e) => this.uploadFile(e)}
                                        />
                                    </label>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Grid spacing={24}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        height="200"
                                        image={obj.images[2].avatarURL}
                                    />
                                </CardActionArea>
                                <CardActions>
                                    <label htmlFor="contained-button-file-2" className="uploadBtnStyleLabel">
                                        <Button variant="outlined" component="span" className={classes.button} size="small">
                                            Upload-3
                                        </Button>
                                        <input
                                            hidden
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file-2"
                                            multiple
                                            type="file"
                                            name="2"
                                            onChange={(e) => this.uploadFile(e)}
                                        />
                                    </label>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </form >)
    }
}
export default withStyles(styles)(Steps2);