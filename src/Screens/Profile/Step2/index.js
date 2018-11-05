import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import firebase from "../../../Config/firebase"

const styles = theme => ({
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
        try {
            var storageRef = firebase.storage().ref("images/" + file.name);
            var uploadTask = storageRef.put(file)

            document.getElementById(e.target.id).disabled = true

            // Listen for state changes, errors, and completion of the upload.
            await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, (error) => {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    console.log("upload Succesful")
                    fileBtn.disabled = false
                }
            )
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    updateImageUrl(downloadURL, fileN)
                    console.log('File available at', downloadURL);
                })

        }
        catch (e) {
            console.log("Some Error Occur While Uploading")
        }

    }

    render() {

        const { classes, obj, updateObj } = this.props;
        const { images } = this.state
        console.log("images of steps", images)
        console.log("obj", obj)
        // console.log("images", this.state.images)

        return (
            <form noValidate autoComplete="off">
                <div>{<img className="avatarSize" src={obj.images[0].avatarURL} />}{<img className="avatarSize" src={obj.images[1].avatarURL} />}{<img className="avatarSize" src={obj.images[2].avatarURL} />}</div>

                <label htmlFor="contained-button-file-0">
                    <Button variant="contained" component="span" className={classes.button}>
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

                <label htmlFor="contained-button-file-1">
                    <Button variant="contained" component="span" className={classes.button}>
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

                <label htmlFor="contained-button-file-2">
                    <Button variant="contained" component="span" className={classes.button}>
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
            </form>)
    }
}
export default withStyles(styles)(Steps2);